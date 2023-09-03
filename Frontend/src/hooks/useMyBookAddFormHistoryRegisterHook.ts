import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookHistoryRegisterAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useToastHook from './useToastHook';
import useMyBookAddFormHook from './useMyBookAddFormHook';
import useMyBookHistoryHook from './useMyBookHistoryHook';

export default function useMyBookAddFormHistoryRegisterHook(
  users_books_id: number
) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_ADD_FORM_HISTORY_REGISTER_KEY';
  const queryClient = new QueryClient();

  const { addToast } = useToastHook();
  const { setAddFormState } = useMyBookAddFormHook();
  const { refetch } = useMyBookHistoryHook(users_books_id);

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    BookRegisterResponseType,
    AxiosError,
    MyBookHistoryRegisterType
  >([REACT_QUERY_KEY], myBookHistoryRegisterAPI);

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
      refetch();
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
