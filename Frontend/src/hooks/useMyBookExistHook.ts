import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookExistAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useToastHook from './useToastHook';

export default function useMyBookExist(isbn: string) {
  const REACT_QUERY_KEY = 'MY_BOOKS_EXIST';
  const { data, isLoading, isFetching, isError, error, isSuccess } = useQuery<
    MyBookExistResponseType,
    AxiosError<{ status: 'string'; message: 'string' }>
  >([REACT_QUERY_KEY, isbn], () => myBookExistAPI(isbn), {
    staleTime: 5 * 1000,
    cacheTime: 3 * 1000,
  });

  const { addToast } = useToastHook();

  useEffect(() => {
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
  }, [isError, error]);

  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
  };
}
