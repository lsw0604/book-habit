import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

import { readingBookRegisterAPI } from 'lib/api/book';
import useToastHook from '@hooks/useToastHook';
import { modalAtom } from 'recoil/modal';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { queriesKey, queryClient } from 'queries';

const { book, myBook } = queriesKey;

export default function useReadingBookMutation() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    ReadingBookMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ReadingBookMutationRequestType
  >([book.useReadingBookMutationKey], readingBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '전체보기'],
      });
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '읽는중'],
      });
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setBookRegisterModalState({
        startDate: null,
        useValidate: false,
        endDate: null,
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
