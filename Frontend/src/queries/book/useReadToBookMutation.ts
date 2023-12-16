import { useMutation, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalAtom } from 'recoil/modal';
import { readToBookRegisterAPI } from 'lib/api/book';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';
import { userAtom } from 'recoil/user';
import { queriesKey } from 'queries';

const { book, myBook } = queriesKey;

export default function useReadToBookMutation() {
  const queryClient = new QueryClient();

  const setModalState = useSetRecoilState(modalAtom);
  const { isLogged } = useRecoilValue(userAtom);

  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();

  const { refetch } = isLogged
    ? useMyBookListInfinityQuery('전체보기')
    : { refetch: () => undefined };

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    useReadToBookMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    useReadToBookMutationRequestType
  >([book.useReadToBookMutationKey], readToBookRegisterAPI, {
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
