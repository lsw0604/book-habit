import { useEffect } from 'react';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { readBookRegisterAPI } from 'lib/api/book';
import useToastHook from '@hooks/useToastHook';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { AxiosError } from 'axios';

export default function useReadRegisterHook() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();

  const REACT_QUERY_KEY = 'USE_READ_BOOK_REGISTER_KEY';
  const queryClient = new QueryClient();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    BookRegisterResponseType,
    AxiosError<{ message: string; status: string }>,
    ReadBookRegisterType
  >([REACT_QUERY_KEY], readBookRegisterAPI, {
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['MY_BOOKS', '전체보기'],
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
        rating: 0,
        page: 0,
        useValidate: false,
      });
      setModalState({ isOpen: false });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.status === 403) {
      addToast({
        message: error.response.data.message,
        status: error.response.data.status,
      });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
