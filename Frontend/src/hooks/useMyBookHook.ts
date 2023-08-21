import { useInfiniteQuery } from '@tanstack/react-query';
import { myBooksAPI } from 'lib/api/book';

export default function useMyBookHook(status: BookStateType) {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage, refetch } =
    useInfiniteQuery<MyBookResponseType>(
      ['MY_BOOKS', status],
      ({ pageParam = 1 }) => myBooksAPI(pageParam, status),
      {
        getNextPageParam: (response) => response.nextPage,
        staleTime: Infinity,
      }
    );

  return {
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    data,
    refetch,
  };
}
