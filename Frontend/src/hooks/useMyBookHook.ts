import { useInfiniteQuery } from '@tanstack/react-query';
import { myBooksAPI } from 'lib/api/book';

export default function useMyBookHook() {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    useInfiniteQuery<MyBookResponseType>(
      ['MY_BOOKS'],
      ({ pageParam = 1 }) => myBooksAPI(pageParam),
      {
        getNextPageParam: (response) => response.nextPage,
        staleTime: Infinity,
      }
    );

  return { isLoading, isFetching, fetchNextPage, hasNextPage, data };
}
