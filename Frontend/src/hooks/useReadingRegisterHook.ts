import { useMutation, QueryClient } from '@tanstack/react-query';
import { readingBookRegisterAPI } from 'lib/api/book';
import useToastHook from './useToastHook';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import useReadingModalHook from './useReadingModalHook';
import { AxiosError } from 'axios';

export default function useReadingRegisterHook() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setReadingBookState } = useReadingModalHook();

  const REACT_QUERY_KEY = 'USE_READING_BOOK_REGISTER_KEY';
  const queryClient = new QueryClient();

  const { mutate, isLoading } = useMutation<
    BookRegisterResponseType,
    AxiosError | Error | null,
    ReadingBookRegisterType
  >([REACT_QUERY_KEY], readingBookRegisterAPI, {
    onSuccess: (data) => {
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
      return queryClient.invalidateQueries([REACT_QUERY_KEY]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response.data.strategy === 'refresh') {
        addToast({ message: '로그인이 필요합니다.', status: 'error' });
      }
    },
  });

  return {
    mutate,
    isLoading,
  };
}
