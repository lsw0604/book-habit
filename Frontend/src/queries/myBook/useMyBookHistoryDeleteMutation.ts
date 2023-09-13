import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import { myBookHistoryDeleteAPI } from 'lib/api/myBook';

export default function useMyBookHistoryDeleteMutation(
  users_books_history_id: number,
  users_books_id: number
) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_HISTORY_DELETE_MUTATION';
  const queryClient = new QueryClient();

  const { myBookHistoryRefetch, myBookTimeRefetch } =
    useMyBookPageQueries(users_books_id);

  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    MyBookHistoryDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookHistoryDeleteMutationRequestType
  >([REACT_QUERY_KEY], () => myBookHistoryDeleteAPI(users_books_history_id), {
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries(['MY_BOOK_HISTORY']);
        myBookHistoryRefetch();
        myBookTimeRefetch();
      }
    },
  });

  useEffect(() => {
    console.log('useMyBookHistoryDeleteMutation', data);
  }, [isSuccess, data]);

  return {
    isLoading,
    mutate,
    isSuccess,
    data,
    isError,
    error,
  };
}
