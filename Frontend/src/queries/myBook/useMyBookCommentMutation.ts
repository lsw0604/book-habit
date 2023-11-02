import useToastHook from '@hooks/useToastHook';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookCommentsRegisterAPI } from 'lib/api/myBook';
import { useEffect } from 'react';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookCommentQuery from './useMyBookCommentQuery';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';

export default function useMyBookCommentMutation(users_books_id: number) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_COMMENT_MUTATION';
  const queryClient = new QueryClient();
  const { addToast } = useToastHook();
  const { onChangeMyBookStateInitial } = useMyBookHook();
  const { refetch: myBookCommentRefetch } =
    useMyBookCommentQuery(users_books_id);
  const { refetch: commentListRefetch } = useCommentsListQuery([]);

  const { isLoading, mutate, isSuccess, data, isError, error } = useMutation<
    MyBookCommentMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookCommentMutationRequestType
  >([REACT_QUERY_KEY, users_books_id], myBookCommentsRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['USE_MY_BOOK_COMMENT_QUERY'],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['USE_COMMENTS_LIST_QUERY'],
      });
      myBookCommentRefetch();
      commentListRefetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { status, message } = data;
      addToast({ status, message });
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
    isLoading,
    mutate,
    isSuccess,
  };
}
