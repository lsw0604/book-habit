import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { v4 } from 'uuid';

import useToastHook from '@hooks/useToastHook';
import { queriesKey } from 'queries';
import { AxiosError } from 'axios';
import { bookRegisterAPI } from 'lib/api/book';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import { searchBookAtom } from 'recoil/searchBook';

const { useBookRegisterMutationKey } = queriesKey.book;

const initialState: SearchBookAtomType = {
  thumbnail: '',
  status: '',
  isbn: '',
  price: 0,
  publisher: '',
  authors: [],
  contents: '',
  url: '',
  title: '',
};

export default function useBookRegisterMutation() {
  const { addToast } = useToastHook();
  const setModalState = useSetRecoilState(modalAtom);
  const setSearchBookState = useSetRecoilState(searchBookAtom);
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation<
    BookRegisterResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    BookRegisterType
  >([useBookRegisterMutationKey, v4()], bookRegisterAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      setModalState({ type: undefined, isOpen: false });
      setSearchBookState(initialState);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
