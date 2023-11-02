import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookListDeleteAPI } from 'lib/api/myBook';
import useMyBookListInfinityQuery from '@queries/myBook/useMyBookListInfinityQuery';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import { useNavigate } from 'react-router-dom';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';

export default function useMyBookListDeleteMutation(
  users_books_id: MyBookListDeleteMutationRequestType
) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_DELETE_MUTATION';
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const { addToast } = useToastHook();
  const { refetch: myBookListRefetch } = useMyBookListInfinityQuery('전체보기');
  const { refetch: commentsListRefetch } = useCommentsListQuery([]);
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation<
    MyBookListDeleteMutationResponseType,
    AxiosError,
    MyBookListDeleteMutationRequestType
  >(
    [REACT_QUERY_KEY, users_books_id],
    () => myBookListDeleteAPI(users_books_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['USE_MY_BOOK_LIST_INFINITY_QUERY'],
        });
        queryClient.invalidateQueries({
          queryKey: ['USE_COMMENTS_LIST_QUERY'],
        });
        myBookListRefetch();
        commentsListRefetch();
      },
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ status, message });
      navigate('/my_books');
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({ message: '삭제에 실패 했습니다.', status: 'error' });
    }
  }, [isError, error]);

  return { mutate, isLoading, isSuccess };
}
