import { useMutation } from '@tanstack/react-query';
import { readToBookRegisterAPI } from 'lib/api/book';
import useToastHook from '@hooks/useToastHook';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import useReadingModalHook from '@hooks/useReadingModalHook';
import { AxiosError } from 'axios';

export default function useReadToRegisterHook() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setReadingBookState } = useReadingModalHook();

  const REACT_QUERY_KEY = 'USE_READ_TO_BOOK_REGISTER_KEY';
  const { mutate, isLoading } = useMutation<
    BookRegisterResponseType,
    AxiosError | Error | null,
    ReadToBookRegisterType
  >([REACT_QUERY_KEY], readToBookRegisterAPI, {
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
