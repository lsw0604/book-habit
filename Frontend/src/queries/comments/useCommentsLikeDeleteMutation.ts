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
              const newComment: CommentsItemType = {
                ...comment,
                like_user_ids: comment.like_user_ids.filter(
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
      } else {
        queryClient.invalidateQueries({
          queryKey: [useCommentsListQueryKey],
        });
      }

      if (commentDetailData) {
        const synthesizedCommentDetailData: CommentsItemType = {
          ...commentDetailData,
          like_user_ids: commentDetailData.like_user_ids.filter(
            (like) => like.user_id !== response.user_id
          ),
        };

        queryClient.setQueryData([useCommentsDetailQueryKey, comment_id], {
          ...synthesizedCommentDetailData,
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [useCommentsDetailQueryKey, comment_id],
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
