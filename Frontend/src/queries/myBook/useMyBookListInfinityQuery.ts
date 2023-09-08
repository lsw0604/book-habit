import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { myBookListAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';

export default function useMyBookListInfinityQuery(status: SelectorBookType) {
  const { addToast } = useToastHook();
  const REACT_QUERY_KEY = 'USE_MY_BOOK_LIST_INFINITY_QUERY';
  const {
    data,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
    refetch,
    isError,
    error,
  } = useInfiniteQuery<MyBookListInfinityQueryResponseType, AxiosError>(
    [REACT_QUERY_KEY, status],
    ({ pageParam = 1 }) => myBookListAPI(pageParam, status),
    {
      getNextPageParam: (response) => response.nextPage,
      staleTime: 1 * 60 * 1000,
      cacheTime: 2 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (isError && error) {
      addToast({
        message: 'MY BOOK을 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [isError, error]);

  return {
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    data,
    refetch,
  };
}
