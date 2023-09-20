import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookHistoryRegisterAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import useModalHook from '@hooks/useModalHook';
import useMyBookListInfinityQuery from './useMyBookListInfinityQuery';

export default function useMyBookHistoryMutation(users_books_id: number) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_HISTORY_MUTATION';
  const queryClient = new QueryClient();

  const { addToast } = useToastHook();
  const { onChangeMyBookStateInitial } = useMyBookHook();
  const { setModalState } = useModalHook();
  const { myBookHistoryRefetch, myBookTimeRefetch } =
    useMyBookPageQueries(users_books_id);
  const { refetch } = useMyBookListInfinityQuery('전체보기');

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
        refetch();
      }
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setModalState({ isOpen: false, type: undefined });
      onChangeMyBookStateInitial();
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
