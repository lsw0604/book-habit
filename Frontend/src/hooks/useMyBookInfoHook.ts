import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookInfoAPI } from 'lib/api/myBook';
import useToastHook from './useToastHook';

export default function useMyBookInfoHook(users_books_id: number) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_INFO_KEY';
  const { addToast } = useToastHook();
  const { data, isLoading, isError, error } = useQuery<
    { users_books_id: number },
    AxiosError<{ message: string; status: string }>,
    { result: { title: string; image: string } }
  >([REACT_QUERY_KEY, users_books_id], () => myBookInfoAPI(users_books_id));

  if (
    isError &&
    error &&
    error.response &&
    error.response.status === 403 &&
    error.response.data
  ) {
    addToast({
      message: error.response.data.message,
      status: error.response.data.status,
    });
  }
  return {
    isLoading,
    data,
  };
}
