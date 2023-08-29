import { useInfiniteQuery } from '@tanstack/react-query';
import { myBookListAPI } from 'lib/api/myBook';

export default function useMyBookListHook(status: SelectorBookType) {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage, refetch } =
    useInfiniteQuery<MyBookResponseType>(
      ['MY_BOOKS', status],
      ({ pageParam = 1 }) => myBookListAPI(pageParam, status),
      {
        getNextPageParam: (response) => response.nextPage,
        staleTime: 20 * 1000,
        cacheTime: 5 * 1000,
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
