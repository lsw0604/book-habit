import { useInfiniteQuery } from '@tanstack/react-query';
import { myBookListAPI } from 'lib/api/myBook';

export default function useMyBookListHook(status: SelectorBookType) {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage, refetch } =
    useInfiniteQuery<MyBookResponseType>(
      ['MY_BOOK_LIST', status],
      ({ pageParam = 1 }) => myBookListAPI(pageParam, status),
      {
        getNextPageParam: (response) => response.nextPage,
        refetchOnMount: true,
        staleTime: 10 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
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
