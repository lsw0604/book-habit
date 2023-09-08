import { useMutation, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import { useSetRecoilState } from 'recoil';

import { modalAtom } from 'recoil/modal';
import { readToBookRegisterAPI } from 'lib/api/book';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';

export default function useReadToBookMutation() {
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();
  const { refetch } = useMyBookListInfinityQuery('전체보기');

  const queryClient = new QueryClient();
  const REACT_QUERY_KEY = 'USE_READ_TO_BOOK_REGISTER_KEY';
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    useReadToBookMutationResponseType,
    AxiosError,
    useReadToBookMutationRequestType
  >([REACT_QUERY_KEY], readToBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MY_BOOK_LIST'] });
      refetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setBookRegisterModalState({
        rating: 0,
        useValidate: false,
        startDate: null,
        endDate: null,
        page: 0,
      });
      setModalState({ isOpen: false });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({
        message: '읽고싶은 책 등록에 실패했습니다.',
        status: 'error',
      });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
