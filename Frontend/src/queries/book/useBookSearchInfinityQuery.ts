import { useInfiniteQuery } from '@tanstack/react-query';

import { booksSearchAPI } from 'lib/api/book';

export default function useBookSearchInfinityQuery(keyword: string) {
  const NAMESPACE = 'USE_BOOK_SEARCH_INFINITY_QUERY';

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage, refetch } =
    useInfiniteQuery<BookSearchInfinityQueryResponseType>(
      [NAMESPACE, keyword],
      ({ pageParam = 1 }) => {
        return keyword.trim() === ''
          ? Promise.resolve({ meta: { is_end: true }, documents: [] })
          : booksSearchAPI(keyword, pageParam);
      },
      {
        getNextPageParam: (response, pages) => {
          if (!response.meta.is_end) {
            return pages.length + 1;
          } else {
            return undefined;
          }
        },
        enabled: false,
        staleTime: Infinity,
        cacheTime: 5 * 60 * 1000,
      }
    );

  return {
    data,
    fetchNextPage,
    isFetching,
    isLoading,
    hasNextPage,
    refetch,
  };
}
