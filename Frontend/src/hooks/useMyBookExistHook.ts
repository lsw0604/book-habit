import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookExistAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useToastHook from './useToastHook';

export default function useMyBookExist(isbn: MyBookExistRequestType) {
  const REACT_QUERY_KEY = 'MY_BOOKS_EXIST';
  const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
    useQuery<MyBookExistResponseType, AxiosError>([REACT_QUERY_KEY, isbn], () =>
      myBookExistAPI(isbn)
    );

  const { addToast } = useToastHook();

  useEffect(() => {
    if (isError && error) {
      addToast({
        message: 'MY BOOK EXIST를 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  };
}
