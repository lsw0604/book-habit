import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { commentsLikeRegisterAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';
import { queriesKey, queryClient } from 'queries';

const {
  useCommentsLikeRegisterMutationKey,
  useCommentsListQueryKey,
  useCommentsDetailQueryKey,
} = queriesKey.comments;

export default function useCommentsLikeRegisterMutation(
  comment_id: CommentsLikeMutationRequestType
) {
  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsLikeMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsLikeMutationRequestType
  >([useCommentsLikeRegisterMutationKey, comment_id], commentsLikeRegisterAPI, {
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
                like_user_ids: [
                  ...comment.like_user_ids,
                  { user_id: response.user_id },
                ],
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
          like_user_ids:
            commentDetailData.like_user_ids.length !== 0
              ? [
                  ...commentDetailData.like_user_ids,
                  { user_id: response.user_id },
                ]
              : [{ user_id: response.user_id }],
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
