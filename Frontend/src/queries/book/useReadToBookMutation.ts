import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import { useSetRecoilState } from 'recoil';

import { modalAtom } from 'recoil/modal';
import { readToBookRegisterAPI } from 'lib/api/book';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { queriesKey, queryClient } from 'queries';

const { book, myBook } = queriesKey;

export default function useReadToBookMutation() {
  const setModalState = useSetRecoilState(modalAtom);

  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    useReadToBookMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    useReadToBookMutationRequestType
  >([book.useReadToBookMutationKey], readToBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '전체보기'],
      });

      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '읽고싶음'],
      });
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setBookRegisterModalState({
        useValidate: false,
        startDate: null,
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
