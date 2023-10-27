import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';
import useProfileReplyQuery from '@queries/profile/useProfileReplyQuery';
import { commentsReplyDeleteAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';

export default function useCommentsReplyDeleteMutation(
  reply_id: CommentsReplyDeleteMutationRequestType,
  comment_id: CommentsReplyDeleteMutationRequestType
) {
  const REACT_QUERY_KEY = 'USE_COMMENTS_REPLY_DELETE_MUTATION';
  const queryClient = new QueryClient();

  const { refetch: profileReplyQueryRefetch } = useProfileReplyQuery(1);
  const { refetch: commentReplyListRefetch } =
    useCommentsReplyListQuery(comment_id);

  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsReplyDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyDeleteMutationRequestType
  >([REACT_QUERY_KEY, comment_id, reply_id], commentsReplyDeleteAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['USE_COMMENTS_REPLY_LIST_QUERY', comment_id],
      });
      commentReplyListRefetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      queryClient.invalidateQueries({
        queryKey: ['USE_PROFILE_REPLY_QUERY'],
      });
      profileReplyQueryRefetch();
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
