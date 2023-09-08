import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookExistAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';

export default function useMyBookExistQuery(isbn: MyBookExistQueryRequestType) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_EXIST_QUERY';
  const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
    useQuery<MyBookExistQueryResponseType, AxiosError>(
      [REACT_QUERY_KEY, isbn],
      () => myBookExistAPI(isbn)
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
