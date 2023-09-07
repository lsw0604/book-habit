import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import useMyBookPageInfoHook from '@hooks/useMyBookPageInfoHook';
import { myBookHistoryDeleteAPI } from 'lib/api/myBook';

export default function useMyBookHistoryDeleteHook(
  users_books_status_id: number,
  users_books_id: number
) {
  const queryClient = new QueryClient();
  const REACT_QUERY_KEY = 'MY_BOOK_HISTORY_DELETE';
  const { myBookHistoryRefetch } = useMyBookPageInfoHook(users_books_id);

  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    MyBookHistoryDeleteResponseType,
    AxiosError,
    MyBookHistoryDeleteRequestType
  >(
    [REACT_QUERY_KEY, users_books_status_id],
    () => myBookHistoryDeleteAPI(users_books_status_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['MY_BOOK_HISTORY']);
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
