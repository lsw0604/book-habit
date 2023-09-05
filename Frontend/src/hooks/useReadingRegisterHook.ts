import { useEffect } from 'react';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

import { readingBookRegisterAPI } from 'lib/api/book';
import useToastHook from './useToastHook';
import { modalAtom } from 'recoil/modal';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import useMyBookListHook from './useMyBookListHook';

export default function useReadingRegisterHook() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();
  const { refetch } = useMyBookListHook('전체보기');

  const REACT_QUERY_KEY = 'USE_READING_BOOK_REGISTER_KEY';
  const queryClient = new QueryClient();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    BookRegisterResponseType,
    AxiosError,
    ReadingBookRegisterType
  >([REACT_QUERY_KEY], readingBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(['MY_BOOK_LIST']);
      refetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setBookRegisterModalState({
        page: 0,
        startDate: null,
        useValidate: false,
        endDate: null,
        rating: 0,
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
