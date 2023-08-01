import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { booksSearchAPI } from 'lib/api/book';

interface IResponseSearch {
  meta: {
    is_end: boolean;
    total_count: number;
    pageable_count: number;
  };
  documents: {
    authors: string;
    contents: string;
    datetime: Date;
    isbn: string;
    price: number;
    publisher: string;
    sale_price: number;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
  }[];
}

export default function useSearchHook(keyword: string) {
  const [page, setPage] = useState(1);
  const NAMESPACE = 'BOOK_SEARCH';

  const queryClient = new QueryClient();

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    useInfiniteQuery<IResponseSearch>(
      [NAMESPACE, keyword],
      ({ pageParam = page }) => {
        return keyword.trim() === ''
          ? Promise.resolve({ meta: { is_end: true }, documents: [] })
          : booksSearchAPI(keyword, pageParam);
      },
      {
        getNextPageParam: (response) => {
          if (!response.meta.is_end) {
            setPage((prev) => prev + 1);
            return page;
          } else {
            return undefined;
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries([NAMESPACE]);
        },
        retry: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    );
  return {
    data,
    fetchNextPage,
    isFetching,
    isLoading,
    hasNextPage,
  };
}
