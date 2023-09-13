import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import { myBookHistoryDeleteAPI } from 'lib/api/myBook';
import useMyBookListInfinityQuery from './useMyBookListInfinityQuery';

export default function useMyBookHistoryDeleteMutation(
  users_books_history_id: number,
  users_books_id: number
) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_HISTORY_DELETE_MUTATION';
  const queryClient = new QueryClient();

  const { myBookHistoryRefetch, myBookTimeRefetch } =
    useMyBookPageQueries(users_books_id);
  const { refetch } = useMyBookListInfinityQuery('전체보기');

  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    MyBookHistoryDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookHistoryDeleteMutationRequestType
  >(
    [REACT_QUERY_KEY, users_books_id, users_books_history_id],
    () => myBookHistoryDeleteAPI(users_books_history_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['MY_BOOK_HISTORY']);
        queryClient.invalidateQueries(['MY_BOOK_TIME']);
        queryClient.invalidateQueries(['USE_MY_BOOK_LIST_INFINITY_QUERY']);
        myBookHistoryRefetch();
        myBookTimeRefetch();
        refetch();
      },
    }
  );

  useEffect(() => {
    console.log('useMyBookHistoryDeleteMutation', data);
  }, [data]);

  return {
    isLoading,
    mutate,
    isSuccess,
    data,
    isError,
    error,
  };
}
