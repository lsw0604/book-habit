import { useEffect } from 'react';
import { AxiosError } from 'axios';

import useToastHook from '@hooks/useToastHook';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { commentsLikeRegisterAPI } from 'lib/api/comments';
import useCommentsLikeListQuery from '@queries/comments/useCommentsLikeListQuery';

export default function useCommentsLikeMutation(
  comment_id: CommentsLikeMutationRequestType
) {
  const REACT_QUERY_KEY = 'USE_COMMENTS_LIKE_MUTATION';
  const queryClient = new QueryClient();

  const { refetch } = useCommentsLikeListQuery(comment_id);

  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsLikeMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsLikeMutationRequestType
  >([REACT_QUERY_KEY, comment_id], commentsLikeRegisterAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      queryClient.invalidateQueries({
        queryKey: ['USE_COMMENTS_LIKE_LIST_QUERY', comment_id],
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
