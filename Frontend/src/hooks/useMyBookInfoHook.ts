import { useQuery } from '@tanstack/react-query';
import { myBooksInfoAPI } from 'lib/api/book';

export default function useMyBookInfoHook(users_books_id: number) {
  const REACT_QUERY_KEY = 'MY_BOOKS_INFO';
  const { data, isLoading, isFetching, refetch } = useQuery(
    [REACT_QUERY_KEY, users_books_id],
    () => myBooksInfoAPI(users_books_id)
  );

  console.log(data);

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}
