import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { modalAtom } from 'recoil/modal';
import useToastHook from '@hooks/useToastHook';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { readBookRegisterAPI } from 'lib/api/book';
import { queriesKey, queryClient } from 'queries';

const { book, myBook } = queriesKey;

export default function useReadBookMutation() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    ReadBookMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ReadBookMutationRequestType
  >([book.useReadBookMutationKey], readBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '전체보기'],
      });
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '다읽음'],
      });
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
