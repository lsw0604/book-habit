import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { myBookHistoryAPI } from 'lib/api/myBook';
import useToastHook from './useToastHook';

export default function useMyBookHistoryHook(
  users_books_id: number,
  filtered?: string[]
) {
  const REACT_QUERY_KEY = 'MY_BOOK_HISTORY';
  const { addToast } = useToastHook();

  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useQuery<
      MyBookHistoryListResponseType,
      AxiosError,
      MyBookHistorySelectType
    >(
      [REACT_QUERY_KEY, users_books_id],
      () => myBookHistoryAPI(users_books_id),
      {
        select: ({ books }) => {
          if (filtered && filtered.includes('전체보기')) {
            return books;
          } else if (filtered && filtered.length === 0) {
            return [];
          } else {
            return books.filter(
              (book) => filtered && filtered.includes(book.status)
            );
          }
        },
        staleTime: 5 * 1000,
        cacheTime: 6 * 1000,
      }
    );

  useEffect(() => {
    if (isError && error) {
      addToast({ message: '기록을 불러오는데 실패했습니다.', status: 'error' });
    }
  }, [isError, error]);

  return {
    isSuccess,
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
}
