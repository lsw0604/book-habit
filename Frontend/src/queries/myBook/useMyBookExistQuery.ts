import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookExistAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import useUserStateHook from '@hooks/useUserStateHook';

export default function useMyBookExistQuery(isbn: MyBookExistQueryRequestType) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_EXIST_QUERY';
  const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
    useQuery<
      MyBookExistQueryResponseType,
      AxiosError<{ message: string; status: StatusType }>
    >([REACT_QUERY_KEY, isbn], () => myBookExistAPI(isbn));

  const { addToast } = useToastHook();
  const { onChangeUserStateInitial } = useUserStateHook();

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message: message, status });
    }

    if (isError && error && error.response && error.response.status === 403) {
      onChangeUserStateInitial();
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
