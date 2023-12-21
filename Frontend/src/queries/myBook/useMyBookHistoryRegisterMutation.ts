import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import useMyBookHook from '@hooks/useMyBookHook';
import useModalHook from '@hooks/useModalHook';
import { myBookHistoryRegisterAPI } from 'lib/api/myBook';
import { queriesKey, queryClient } from 'queries';

const {
  useMyBookHistoryRegisterMutationKey,
  useMyBookPageQueriesKey,
  useMyBookListInfinityQueryKey,
} = queriesKey.myBook;

export default function useMyBookHistoryRegisterMutation(
  users_books_id: number
) {
  const { addToast } = useToastHook();
  const { onChangeMyBookStateInitial } = useMyBookHook();
  const { setModalState } = useModalHook();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    MyBookHistoryMutationResponseType,
    AxiosError<{ status: StatusType; message: string }>,
    MyBookHistoryMutationRequestType
  >([useMyBookHistoryRegisterMutationKey], myBookHistoryRegisterAPI, {
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
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setModalState({ isOpen: false, type: undefined });
      onChangeMyBookStateInitial();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
