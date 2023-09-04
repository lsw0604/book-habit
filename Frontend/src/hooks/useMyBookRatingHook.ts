import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookRatingAPI } from 'lib/api/myBook';

export default function useMyBookRatingHook(users_books_id: number) {
  const REACT_QUERY_KEY = 'MY_BOOK_RATING';

  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useQuery<MyBookRatingResponseType, AxiosError>(
      [REACT_QUERY_KEY, users_books_id],
      () => myBookRatingAPI(users_books_id)
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
