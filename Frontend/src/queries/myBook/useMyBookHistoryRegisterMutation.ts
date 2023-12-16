import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import useMyBookHook from '@hooks/useMyBookHook';
import useModalHook from '@hooks/useModalHook';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';
import { myBookHistoryRegisterAPI } from 'lib/api/myBook';
import { queriesKey } from 'queries';

const { useMyBookHistoryRegisterMutationKey, useMyBookPageQueriesKey } =
  queriesKey.myBook;

export default function useMyBookHistoryRegisterMutation(
  users_books_id: number
) {
  const queryClient = new QueryClient();

  const { addToast } = useToastHook();
  const { onChangeMyBookStateInitial } = useMyBookHook();
  const { setModalState } = useModalHook();

  const { myBookHistoryRefetch, myBookTimeRefetch } =
    useMyBookPageQueries(users_books_id);
  const { refetch } = useMyBookListInfinityQuery('전체보기');

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    MyBookHistoryMutationResponseType,
    AxiosError<{ status: StatusType; message: string }>,
    MyBookHistoryMutationRequestType
  >([useMyBookHistoryRegisterMutationKey], myBookHistoryRegisterAPI, {
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries([useMyBookPageQueriesKey.history]);
        myBookHistoryRefetch();
        myBookTimeRefetch();
        refetch();
      }
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
