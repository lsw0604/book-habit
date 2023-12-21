import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { myBookHistoryDeleteAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';
import { queriesKey, queryClient } from 'queries';

const {
  useMyBookHistoryDeleteMutationKey,
  useMyBookPageQueriesKey,
  useMyBookListInfinityQueryKey,
} = queriesKey.myBook;

export default function useMyBookHistoryDeleteMutation(
  users_books_history_id: number,
  users_books_id: number
) {
  const { addToast } = useToastHook();

  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    MyBookHistoryDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookHistoryDeleteMutationRequestType
  >(
    [useMyBookHistoryDeleteMutationKey, users_books_id, users_books_history_id],
    myBookHistoryDeleteAPI,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [useMyBookPageQueriesKey.history, users_books_id],
        });
        queryClient.invalidateQueries({
          queryKey: [useMyBookPageQueriesKey.time, users_books_id],
        });
        queryClient.invalidateQueries({
          queryKey: [useMyBookListInfinityQueryKey],
        });
      },
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
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
