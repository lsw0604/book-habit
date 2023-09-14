import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookHistoryRegisterAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';

export default function useMyBookHistoryMutation(users_books_id: number) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_HISTORY_MUTATION';
  const queryClient = new QueryClient();

  const { addToast } = useToastHook();
  const { onChangeAddFormStateInitial } = useMyBookAddFormHook();
  const { myBookHistoryRefetch, myBookTimeRefetch } =
    useMyBookPageQueries(users_books_id);

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    MyBookHistoryMutationResponseType,
    AxiosError,
    MyBookHistoryMutationRequestType
  >([REACT_QUERY_KEY], myBookHistoryRegisterAPI, {
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries(['MY_BOOK_HISTORY']);
        myBookHistoryRefetch();
        myBookTimeRefetch();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      onChangeAddFormStateInitial();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({
        message: '내 서재에 있는 책에 기록 등록에 실패했습니다.',
        status: 'error',
      });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
