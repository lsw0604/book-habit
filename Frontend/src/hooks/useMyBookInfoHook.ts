import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookInfoAPI } from 'lib/api/myBook';
import useToastHook from './useToastHook';

export default function useMyBookInfoHook(users_books_id: number) {
  const REACT_QUERY_KEY = 'MY_BOOK_INFO';
  const { addToast } = useToastHook();
  const { data, isLoading, isError, error } = useQuery<
    MyBookInfoResponseType,
    AxiosError
  >([REACT_QUERY_KEY, users_books_id], () => myBookInfoAPI(users_books_id), {
    staleTime: 2 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
  });

  if (isError && error) {
    addToast({
      message: 'MY BOOK INFO를 불러오는데 실패했습니다.',
      status: 'error',
    });
  }

  return {
    isLoading,
    data,
  };
}
