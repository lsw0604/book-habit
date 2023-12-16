import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { commentsLikeRegisterAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';
import { queriesKey } from 'queries';
import { queryClient } from 'main';

const { useCommentsLikeRegisterMutationKey, useCommentsListQueryKey } =
  queriesKey.comments;

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
      const data = queryClient.getQueryData<CommentsListQueryResponseType>([
        useCommentsListQueryKey,
      ]);

      const mappedData = data?.comments.map((comment) => {
        if (comment.comment_id === comment_id) {
          const newComment = {
            ...comment,
            like_user_id: [
              ...comment.like_user_id,
              { user_id: response.user_id },
            ],
          };

          return newComment;
        }
        return comment;
      });

      queryClient.setQueryData([useCommentsListQueryKey], {
        comments: mappedData,
      });
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
