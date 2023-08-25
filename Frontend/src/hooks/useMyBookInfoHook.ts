import { useQuery } from '@tanstack/react-query';
import { myBooksInfoAPI } from 'lib/api/book';

export default function useMyBookInfoHook(
  title: string,
  users_books_id: number
) {
  const REACT_QUERY_KEY = 'MY_BOOKS_INFO';
  const { data, isLoading, isFetching, refetch } = useQuery(
    [REACT_QUERY_KEY, title, users_books_id],
    () => myBooksInfoAPI(users_books_id, title)
  );

  console.log(data);

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}
