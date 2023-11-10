import { useEffect } from 'react';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { myBookCommentDeleteAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';
import { AxiosError } from 'axios';
import useMyBookCommentQuery from './useMyBookCommentQuery';

const REACT_QUERY_KEY = 'USE_MY_BOOK_COMMENT_DELETE_MUTATION';

export default function useMyBookCommentDeleteMutation(
  users_books_id: number,
  comment_id: number
) {
  const queryClient = new QueryClient();

  const { addToast } = useToastHook();
  const { refetch } = useMyBookCommentQuery(users_books_id);

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    MyBookCommentDeleteMutationResponseType,
    AxiosError,
    MyBOokCommentDeleteMutationRequestType
  >([REACT_QUERY_KEY, users_books_id, comment_id], myBookCommentDeleteAPI);

  useEffect(() => {
    if (isSuccess && data) {
      queryClient.invalidateQueries({
        queryKey: ['USE_MY_BOOK_COMMENTS_QUERY'],
        exact: true,
      });
      refetch();
      const { message, status } = data;
      addToast({ message, status });
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
    isSuccess,
  };
}
