import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { commentsLikeDeleteAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';
import { queriesKey, queryClient } from 'queries';

const {
  useCommentsLikeDeleteMutationKey,
  useCommentsListQueryKey,
  useCommentsDetailQueryKey,
} = queriesKey.comments;

export default function useCommentsLikeDeleteMutation(
  comment_id: CommentsLikeDeleteMutationRequestType
) {
  const { addToast } = useToastHook();

  const { data, isLoading, isError, error, isSuccess, mutate } = useMutation<
    CommentsLikeDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsLikeDeleteMutationRequestType
  >([useCommentsLikeDeleteMutationKey, comment_id], commentsLikeDeleteAPI, {
    onSuccess: (response) => {
      const commentsListData =
        queryClient.getQueryData<CommentsListQueryResponseType>([
          useCommentsListQueryKey,
        ]);

      const commentDetailData =
        queryClient.getQueryData<CommentsDetailQueryResponseType>([
          useCommentsDetailQueryKey,
          comment_id,
        ]);

      if (commentsListData) {
        const synthesizedCommentsListData = commentsListData?.comments.map(
          (comment) => {
            if (comment.comment_id === comment_id) {
              const newComment = {
                ...comment,
                like_user_id: comment.like_user_id.filter(
                  (like_id) => like_id.user_id !== response.user_id
                ),
              };

              return newComment;
            }
            return comment;
          }
        );

        queryClient.setQueryData([useCommentsListQueryKey], {
          comments: synthesizedCommentsListData,
        });
      }

      if (commentDetailData) {
        const synthesizedCommentDetailData = {
          ...commentDetailData,
          like_user_id: commentDetailData.like_user_id.filter(
            (like) => like.user_id !== response.user_id
          ),
        };

        queryClient.setQueryData([useCommentsDetailQueryKey, comment_id], {
          ...synthesizedCommentDetailData,
        });
      }
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;

      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
    isSuccess,
    data,
  };
}
