import { useMutation, QueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import { modalAtom } from 'recoil/modal';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';
import { readBookRegisterAPI } from 'lib/api/book';
import { userAtom } from 'recoil/user';
import { queriesKey } from 'queries';

const { book, myBook } = queriesKey;

export default function useReadBookMutation() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { isLogged } = useRecoilValue(userAtom);
  const { setBookRegisterModalState } = useBookRegisterModalHook();

  const { refetch } = isLogged
    ? useMyBookListInfinityQuery('전체보기')
    : { refetch: () => undefined };

  const queryClient = new QueryClient();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    ReadBookMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ReadBookMutationRequestType
  >([book.useReadBookMutationKey], readBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey],
      });
      refetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setBookRegisterModalState({
        startDate: null,
        endDate: null,
        useValidate: false,
      });
      setModalState({ isOpen: false });
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
