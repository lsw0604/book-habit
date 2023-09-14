import useToastHook from '@hooks/useToastHook';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookCommentUpdateAPI } from 'lib/api/myBook';
import { useEffect } from 'react';

export default function useMyBookCommentUpdateMutation(
  comment_id: number,
  body: { comment: string; rating: number }
) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_COMMENT_UPDATE_MUTATION';
  const queryClient = new QueryClient();

  const { addToast } = useToastHook();

  const { mutate, isLoading, data, isSuccess, isError, error } = useMutation<
    MyBookCommentUpdateMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([REACT_QUERY_KEY], () => myBookCommentUpdateAPI(comment_id, body));

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      queryClient.invalidateQueries(['USE_MY_BOOK_COMMENT_QUERY']);
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
