import { useEffect } from 'react';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { readBookRegisterAPI } from 'lib/api/book';
import useToastHook from '@hooks/useToastHook';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import useReadModalHook from './useReadModalHook';
import { AxiosError } from 'axios';

export default function useReadRegisterHook() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setReadBookState } = useReadModalHook();

  const REACT_QUERY_KEY = 'USE_READ_BOOK_REGISTER_KEY';
  const queryClient = new QueryClient();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    BookRegisterResponseType,
    AxiosError,
    ReadBookRegisterType
  >([REACT_QUERY_KEY], readBookRegisterAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setReadBookState({
        startDate: null,
        endDate: null,
        rating: 0,
        useValidate: false,
      });
      setModalState({
        author: [],
        company: '',
        image: '',
        isbn: '',
        isOpen: false,
        price: 0,
        title: '',
      });
      queryClient.invalidateQueries([REACT_QUERY_KEY]);
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
