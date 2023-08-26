import { useMutation, QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { readToBookRegisterAPI } from 'lib/api/book';
import useToastHook from '@hooks/useToastHook';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import useReadToModalHook from '@hooks/useReadToModalHook';
import { AxiosError } from 'axios';

export default function useReadToRegisterHook() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setReadToBookState } = useReadToModalHook();

  const queryClient = new QueryClient();
  const REACT_QUERY_KEY = 'USE_READ_TO_BOOK_REGISTER_KEY';
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    BookRegisterResponseType,
    AxiosError,
    ReadToBookRegisterType
  >([REACT_QUERY_KEY], readToBookRegisterAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setReadToBookState({ rating: 0, useValidate: false });
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
