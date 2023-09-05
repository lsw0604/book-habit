import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookListDeleteAPI } from 'lib/api/myBook';
import useMyBookListHook from './useMyBookListHook';
import { useEffect } from 'react';
import useToastHook from './useToastHook';
import { useNavigate } from 'react-router-dom';

interface IData {
  message: string;
  status: string;
}

export default function useMyBookListDeleteHook(users_books_id: number) {
  const REACT_QUERY_KEY = 'MY_BOOK_LIST_DELETE';
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const { addToast } = useToastHook();
  const { refetch } = useMyBookListHook('전체보기');
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation<
    IData,
    AxiosError,
    number
  >(
    [REACT_QUERY_KEY, users_books_id],
    () => myBookListDeleteAPI(users_books_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['MY_BOOK_LIST'] });
        refetch();
      },
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ status, message });
      navigate('/my_books');
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({ message: '삭제에 실패 했습니다.', status: 'error' });
    }
  }, [isError, error]);

  return { mutate, isLoading };
}
