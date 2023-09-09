import useToastHook from '@hooks/useToastHook';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookCommentsRegisterAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useMyBookPageQueries from './useMyBookPageQueries';

export default function useMyBookCommentMutation(users_books_id: number) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_COMMENT_MUTATION';
  const queryClient = new QueryClient();
  const { addToast } = useToastHook();
  const { myBookCommentsRefetch } = useMyBookPageQueries(users_books_id);

  const { isLoading, mutate, isSuccess, data, isError, error } = useMutation<
    MyBookCommentMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookCommentMutationRequestType
  >([REACT_QUERY_KEY, users_books_id], myBookCommentsRegisterAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { status, message } = data;
      addToast({ status, message });
      queryClient.invalidateQueries({
        queryKey: ['MY_BOOK_COMMENTS'],
      });
      myBookCommentsRefetch();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    isLoading,
    mutate,
    isSuccess,
  };
}
