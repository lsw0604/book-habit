import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import { myBookHistoryDeleteAPI } from 'lib/api/myBook';

export default function useMyBookHistoryDeleteMutation(
  users_books_history_id: number,
  users_books_id: number
) {
  const queryClient = new QueryClient();
  const REACT_QUERY_KEY = 'USE_MY_BOOK_HISTORY_DELETE_MUTATION';
  const { myBookHistoryRefetch } = useMyBookPageQueries(users_books_id);

  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    MyBookHistoryDeleteMutationResponseType,
    AxiosError,
    MyBookHistoryDeleteMutationRequestType
  >(
    [REACT_QUERY_KEY, users_books_history_id],
    () => myBookHistoryDeleteAPI(users_books_history_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['USE_MY_BOOK_LIST_INFINITY_QUERY'],
        });
        myBookHistoryRefetch();
      },
    }
  );

  const { addToast } = useToastHook();

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({ message: '삭제에 실패했습니다.', status: 'error' });
    }
  }, [isError, error]);

  return {
    isLoading,
    mutate,
  };
}
