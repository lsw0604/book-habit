import { useEffect } from 'react';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

import { readingBookRegisterAPI } from 'lib/api/book';
import useToastHook from './useToastHook';
import { modalAtom } from 'recoil/modal';
import useReadingModalHook from './useReadingModalHook';

export default function useReadingRegisterHook() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setReadingBookState } = useReadingModalHook();

  const REACT_QUERY_KEY = 'USE_READING_BOOK_REGISTER_KEY';
  const queryClient = new QueryClient();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    BookRegisterResponseType,
    AxiosError,
    ReadingBookRegisterType
  >([REACT_QUERY_KEY], readingBookRegisterAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setReadingBookState({ page: 0, startDate: null, useValidate: false });
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
