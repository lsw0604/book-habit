import { useMutation, QueryClient } from '@tanstack/react-query';
import useToastHook from './useToastHook';
import useMyBookAddFormHook from './useMyBookAddFormHook';
import { myBookRatingRegisterAPI } from 'lib/api/myBook';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export default function useMyBookAddFormRatingRegisterHook() {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_ADD_FORM_RATING_REGISTER_KEY';
  const queryClient = new QueryClient();

  const { addToast } = useToastHook();
  const { setAddFormState } = useMyBookAddFormHook();
  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    BookRegisterResponseType,
    AxiosError,
    MyBookRatingRegisterType
  >([REACT_QUERY_KEY], myBookRatingRegisterAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setAddFormState({
        date: null,
        page: '',
        status: '',
        useValidation: false,
        rating: 0,
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
    isLoading,
    mutate,
  };
}
