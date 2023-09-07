import { QueryClient, useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import { myBookRatingDeleteAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';
import useMyBookPageInfoHook from './useMyBookPageInfoHook';

export default function useMyBookRatingDeleteHook(
  users_books_id: number,
  users_books_info_id: number
) {
  const queryClient = new QueryClient();
  const REACT_QUERY_KEY = 'MY_BOOK_RATING_DELETE';
  const { myBookRatingRefetch } = useMyBookPageInfoHook(users_books_id);

  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    MyBookRatingDeleteResponseType,
    AxiosError,
    MyBookRatingDeleteRequestType
  >(
    [REACT_QUERY_KEY, users_books_info_id],
    () => myBookRatingDeleteAPI(users_books_info_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['MY_BOOK_RATING']);
        myBookRatingRefetch();
      },
    }
  );

  const { addToast } = useToastHook();

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({ message: '삭제에 실패했습니다.', status: 'error' });
    }
  }, [isError, error]);

  return {
    isLoading,
    mutate,
  };
}
