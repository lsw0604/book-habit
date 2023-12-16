import { QueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookCommentListQuery from '@queries/myBook/useMyBookCommentListQuery';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import { myBookCommentsRegisterAPI } from 'lib/api/myBook';
import { queriesKey } from 'queries';

const { comments, myBook } = queriesKey;

export default function useMyBookCommentRegisterMutation(
  users_books_id: number
) {
  const queryClient = new QueryClient();
  const { addToast } = useToastHook();
  const { onChangeMyBookStateInitial } = useMyBookHook();

  const { refetch: myBookCommentRefetch } =
    useMyBookCommentListQuery(users_books_id);
  const { refetch: commentListRefetch } = useCommentsListQuery([]);

  const { isLoading, mutate, isSuccess, data, isError, error } = useMutation<
    MyBookCommentMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookCommentMutationRequestType
  >(
    [myBook.useMyBookCommentRegisterMutationKey, users_books_id],
    myBookCommentsRegisterAPI,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [myBook.useMyBookCommentListQueryKey],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: [comments.useCommentsListQueryKey],
        });
        myBookCommentRefetch();
        commentListRefetch();
      },
    }
  );

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
