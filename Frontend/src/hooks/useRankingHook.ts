import { useInfiniteQuery } from '@tanstack/react-query';
import { rankingAPI } from 'lib/api/book';

export default function useRankingHook() {
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    useInfiniteQuery<ResponseBookType>(
      ['BESTSELLER'],
      ({ pageParam = 1 }) => rankingAPI(pageParam, 10),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: Infinity,
      }
    );

  return { isLoading, isFetching, fetchNextPage, hasNextPage, data };
}
