import { useMutation, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalAtom } from 'recoil/modal';
import { readToBookRegisterAPI } from 'lib/api/book';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';
import { userAtom } from 'recoil/user';

const REACT_QUERY_KEY = 'USE_READ_TO_BOOK_REGISTER_KEY';

export default function useReadToBookMutation() {
  const queryClient = new QueryClient();

  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { isLogged } = useRecoilValue(userAtom);
  const { setBookRegisterModalState } = useBookRegisterModalHook();
  const { refetch } = isLogged
    ? useMyBookListInfinityQuery('전체보기')
    : { refetch: () => undefined };

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
        useValidate: false,
        startDate: null,
        endDate: null,
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
