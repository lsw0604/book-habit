import { useEffect } from 'react';
import { AxiosError } from 'axios';

import useToastHook from '@hooks/useToastHook';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { commentsReplyDeleteAPI } from 'lib/api/comments';
import useCommentsReplyListQuery from './useCommentsReplyListQuery';

export default function useCommentsReplyDeleteMutation(
  reply_id: CommentsReplyDeleteMutationRequestType,
  comment_id: CommentsReplyDeleteMutationRequestType
) {
  const REACT_QUERY_KEY = 'USE_COMMENTS_REPLY_DELETE_MUTATION';
  const queryClient = new QueryClient();
  const { refetch } = useCommentsReplyListQuery(comment_id);

  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsReplyDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyDeleteMutationRequestType
  >([REACT_QUERY_KEY, comment_id, reply_id], commentsReplyDeleteAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;

      addToast({ message, status });
      queryClient.invalidateQueries({
        queryKey: ['USE_COMMENTS_REPLY_LIST_QUERY', comment_id],
      });
      refetch();
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
