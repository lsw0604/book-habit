import useToastHook from '@hooks/useToastHook';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookCommentUpdateAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useMyBookCommentQuery from './useMyBookCommentQuery';
import useModalHook from '@hooks/useModalHook';
import useMyBookHook from '@hooks/useMyBookHook';

const REACT_QUERY_KEY = 'USE_MY_BOOK_COMMENT_UPDATE_MUTATION';

export default function useMyBookCommentUpdateMutation(users_books_id: number) {
  const queryClient = new QueryClient();

  const { refetch } = useMyBookCommentQuery(users_books_id);
  const { addToast } = useToastHook();
  const { setModalState } = useModalHook();
  const { onChangeMyBookStateInitial } = useMyBookHook();

  const { mutate, isLoading, data, isSuccess, isError, error } = useMutation<
    MyBookCommentUpdateMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookCommentUpdateMutationRequestType
  >([REACT_QUERY_KEY], myBookCommentUpdateAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      queryClient.invalidateQueries(['USE_MY_BOOK_COMMENT_QUERY']);
      setModalState({ isOpen: false, type: undefined });
      addToast({ message, status });
      refetch();
      onChangeMyBookStateInitial();
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
