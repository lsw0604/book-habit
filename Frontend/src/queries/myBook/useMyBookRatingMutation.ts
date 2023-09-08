import { useMutation, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { myBookRatingRegisterAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';

export default function useMyBookRatingMutation(users_books_id: number) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_RATING_MUTATION';
  const queryClient = new QueryClient();
  const { myBookRatingRefetch } = useMyBookPageQueries(users_books_id);

  const { addToast } = useToastHook();
  const { setAddFormState } = useMyBookAddFormHook();
  const { mutate, isSuccess, data, isError, error, isLoading } = useMutation<
    MyBookRatingMutationResponseType,
    AxiosError,
    MyBookRatingMutationRequestType
  >([REACT_QUERY_KEY], myBookRatingRegisterAPI, {
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries(['MY_BOOK_RATING']);
        myBookRatingRefetch();
      }
    },
  });

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
