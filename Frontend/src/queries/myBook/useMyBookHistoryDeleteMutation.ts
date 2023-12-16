import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';
import { myBookHistoryDeleteAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';
import { queriesKey } from 'queries';

const {
  useMyBookHistoryDeleteMutationKey,
  useMyBookPageQueriesKey,
  useMyBookListInfinityQueryKey,
} = queriesKey.myBook;

export default function useMyBookHistoryDeleteMutation(
  users_books_history_id: number,
  users_books_id: number
) {
  const queryClient = new QueryClient();

  const { myBookHistoryRefetch, myBookTimeRefetch } =
    useMyBookPageQueries(users_books_id);
  const { refetch } = useMyBookListInfinityQuery('전체보기');
  const { addToast } = useToastHook();

  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    MyBookHistoryDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookHistoryDeleteMutationRequestType
  >(
    [useMyBookHistoryDeleteMutationKey, users_books_id, users_books_history_id],
    myBookHistoryDeleteAPI
  );

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      queryClient.invalidateQueries({
        queryKey: [useMyBookPageQueriesKey.history],
      });
      queryClient.invalidateQueries({
        queryKey: [useMyBookPageQueriesKey.time],
      });
      queryClient.invalidateQueries({
        queryKey: [useMyBookListInfinityQueryKey],
      });
      myBookHistoryRefetch();
      myBookTimeRefetch();
      refetch();
      addToast({ message, status });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { status, message } = error.response.data;
      addToast({ message, status });
    }
  }, [error, isError]);

  return {
    isLoading,
    mutate,
    isSuccess,
    data,
    isError,
    error,
  };
}
