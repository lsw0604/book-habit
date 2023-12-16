import { useEffect } from 'react';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

import { readingBookRegisterAPI } from 'lib/api/book';
import useToastHook from '@hooks/useToastHook';
import { modalAtom } from 'recoil/modal';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import useMyBookListHook from '@queries/myBook/useMyBookListInfinityQuery';
import { userAtom } from 'recoil/user';
import { queriesKey } from 'queries';

const { book, myBook } = queriesKey;

export default function useReadingBookMutation() {
  const queryClient = new QueryClient();

  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();
  const { isLogged } = useRecoilValue(userAtom);

  const { refetch } = isLogged
    ? useMyBookListHook('전체보기')
    : { refetch: () => undefined };

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    ReadingBookMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ReadingBookMutationRequestType
  >([book.useReadingBookMutationKey], readingBookRegisterAPI, {
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
