import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { commentsReplyDeleteAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';
import { queriesKey, queryClient } from 'queries';

const { comments, profile } = queriesKey;

export default function useCommentsReplyDeleteMutation(
  reply_id: CommentsReplyDeleteMutationRequestType,
  comment_id: CommentsReplyDeleteMutationRequestType
) {
  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsReplyDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyDeleteMutationRequestType
  >(
    [comments.useCommentsReplyDeleteMutationKey, comment_id, reply_id],
    commentsReplyDeleteAPI,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [comments.useCommentsReplyListQueryKey, comment_id],
        });
        queryClient.invalidateQueries({
          queryKey: [profile.useProfileReplyQueryKey],
        });
      },
    }
  );

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
  };
}
