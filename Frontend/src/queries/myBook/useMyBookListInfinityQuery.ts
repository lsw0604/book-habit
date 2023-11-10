import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { myBookListAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';

const REACT_QUERY_KEY = 'USE_MY_BOOK_LIST_INFINITY_QUERY';

export default function useMyBookListInfinityQuery(status: SelectorBookType) {
  const { addToast } = useToastHook();

  const {
    data,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
    refetch,
    isError,
    error,
  } = useInfiniteQuery<
    MyBookListInfinityQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >(
    [REACT_QUERY_KEY, status],
    ({ pageParam = 1 }) => myBookListAPI(pageParam, status),
    {
      getNextPageParam: (response) => response.nextPage,
      staleTime: 1 * 60 * 1000,
      cacheTime: 2 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
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
