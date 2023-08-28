import { useQuery } from '@tanstack/react-query';
import { myBooksInfoAPI } from 'lib/api/book';

export default function useMyBookInfoList(
  users_books_id: number,
  title: string,
  filtered: string[]
) {
  const REACT_QUERY_KEY = 'MY_BOOK_INFO_LIST';

  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useQuery(
      [REACT_QUERY_KEY, users_books_id, title],
      () => myBooksInfoAPI(users_books_id, title),
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
