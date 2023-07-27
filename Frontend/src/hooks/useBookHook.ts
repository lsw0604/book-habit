import { useInfiniteQuery } from '@tanstack/react-query';
import { bestsellerAPI } from 'lib/api/book';

export default function useBookHook() {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    useInfiniteQuery<ResponseBookType>(
      ['BESTSELLER'],
      ({ pageParam = 1 }) => bestsellerAPI(pageParam, 10),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  return { isLoading, isFetching, fetchNextPage, hasNextPage, data };
}
