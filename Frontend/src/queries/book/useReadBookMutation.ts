import { useMutation, QueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import { modalAtom } from 'recoil/modal';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';
import { readBookRegisterAPI } from 'lib/api/book';

export default function useReadBookMutation() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();
  const { refetch } = useMyBookListInfinityQuery('전체보기');

  const REACT_QUERY_KEY = 'USE_READ_BOOK_MUTATION';
  const queryClient = new QueryClient();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    ReadBookMutationResponseType,
    AxiosError<{ message: string; status: string }>,
    ReadBookMutationRequestType
  >([REACT_QUERY_KEY], readBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['USE_MY_BOOK_LIST_INFINITY_QUERY'],
      });
      refetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setBookRegisterModalState({
        startDate: null,
        endDate: null,
        useValidate: false,
      });
      setModalState({ isOpen: false });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({
        message: '읽은책 등록에 실패했습니다.',
        status: 'error',
      });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
