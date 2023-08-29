import { useQuery } from '@tanstack/react-query';
import { myBookHistoryAPI } from 'lib/api/myBook';

export default function useMyBookHistoryHook(
  users_books_id: number,
  filtered: string[]
) {
  const REACT_QUERY_KEY = 'MY_BOOK_HISTORY';

  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useQuery(
      [REACT_QUERY_KEY, users_books_id],
      () => myBookHistoryAPI(users_books_id),
      {
        select: ({ books }) => {
          if (filtered.includes('전체보기')) {
            return books;
          } else if (filtered.length === 0) {
            return [];
          } else {
            return books.filter((book) => filtered.includes(book.status));
          }
        },
      }
    );

  return {
    isSuccess,
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
}
