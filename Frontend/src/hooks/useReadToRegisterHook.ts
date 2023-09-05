import { useMutation, QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { readToBookRegisterAPI } from 'lib/api/book';
import useToastHook from '@hooks/useToastHook';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { AxiosError } from 'axios';
import useMyBookListHook from './useMyBookListHook';

export default function useReadToRegisterHook() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();
  const { refetch } = useMyBookListHook('전체보기');

  const queryClient = new QueryClient();
  const REACT_QUERY_KEY = 'USE_READ_TO_BOOK_REGISTER_KEY';
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    BookRegisterResponseType,
    AxiosError,
    ReadToBookRegisterType
  >([REACT_QUERY_KEY], readToBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MY_BOOK_LIST'] });
      refetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setBookRegisterModalState({
        rating: 0,
        useValidate: false,
        startDate: null,
        endDate: null,
        page: 0,
      });
      setModalState({ isOpen: false });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.status === 403) {
      addToast({ message: '로그인이 필요합니다.', status: 'error' });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
