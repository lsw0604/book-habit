import { useEffect } from 'react';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

import { readingBookRegisterAPI } from 'lib/api/book';
import useToastHook from '@hooks/useToastHook';
import { modalAtom } from 'recoil/modal';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import useMyBookListHook from '@queries/myBook/useMyBookListInfinityQuery';
import { userAtom } from 'recoil/user';

const REACT_QUERY_KEY = 'USE_READING_BOOK_MUTATION';

export default function useReadingBookMutation() {
  const queryClient = new QueryClient();

  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const { setBookRegisterModalState } = useBookRegisterModalHook();
  const { isLogged } = useRecoilValue(userAtom);

  const { refetch } = isLogged
    ? useMyBookListHook('전체보기')
    : { refetch: () => undefined };

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    ReadingBookMutationResponseType,
    AxiosError,
    ReadingBookMutationRequestType
  >([REACT_QUERY_KEY], readingBookRegisterAPI, {
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
        useValidate: false,
        endDate: null,
      });
      setModalState({ isOpen: false });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({
        message: '읽는중인 책 등록에 실패했습니다.',
        status: 'error',
      });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
