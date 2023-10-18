import { useEffect } from 'react';
import { AxiosError } from 'axios';

import useToastHook from '@hooks/useToastHook';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { commentsReplyRegisterAPI } from 'lib/api/comments';
import useCommentsReplyListQuery from './useCommentsReplyListQuery';
import useProfileReplyQuery from '@queries/profile/useProfileReplyQuery';

export default function useCommentsReplyMutation(comment_id: number) {
  const REACT_QUERY_KEY = 'USE_COMMENTS_REPLY_MUTATION';
  const queryClient = new QueryClient();
  const { refetch: commentsReplyListRefetch } =
    useCommentsReplyListQuery(comment_id);
  const { refetch: profileReplyListRefetch } = useProfileReplyQuery(1);

  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsReplyMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyMutationRequestType
  >([REACT_QUERY_KEY, comment_id], commentsReplyRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['USE_COMMENTS_REPLY_LIST_QUERY', comment_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['USE_PROFILE_REPLY_QUERY'],
      });
      commentsReplyListRefetch();
      profileReplyListRefetch();
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
  };
}
