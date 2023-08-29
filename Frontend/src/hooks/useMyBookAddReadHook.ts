import { useMutation, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from './useToastHook';
import useReadModalHook from './useReadModalHook';
import { myBooksInfoAddReadAPI } from 'lib/api/book';
import useMyBookHistoryHook from './useMyBookHistoryHook';

export default function useMyBookAddReadHook(users_books_id: string) {
  const { addToast } = useToastHook();
  const { setReadBookState } = useReadModalHook();
  const { refetch } = useMyBookHistoryHook(parseInt(users_books_id), [
    '다읽음',
    '전체보기',
  ]);

  const REACT_QUERY_KEY = 'MY_BOOK_READ_BOOK_ADD_KEY';
  const queryClient = new QueryClient();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    BookRegisterResponseType,
    AxiosError,
    MyBookInfoAddReadType
  >([REACT_QUERY_KEY], myBooksInfoAddReadAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setReadBookState({
        endDate: null,
        startDate: null,
        rating: 0,
        useValidate: false,
      });
      queryClient.invalidateQueries([REACT_QUERY_KEY]);
      refetch();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.status === 403) {
      addToast({ message: '로그인이 필요합니다.', status: 'error' });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
