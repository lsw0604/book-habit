import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { QueryClient, useMutation } from '@tanstack/react-query';

import { myBookCommentDeleteAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';
import useMyBookCommentListQuery from '@queries/myBook/useMyBookCommentListQuery';
import { queriesKey } from 'queries';

const { useMyBookCommentDeleteMutationKey, useMyBookCommentListQueryKey } =
  queriesKey.myBook;

export default function useMyBookCommentDeleteMutation(
  users_books_id: number,
  comment_id: number
) {
  const queryClient = new QueryClient();

  const { addToast } = useToastHook();
  const { refetch } = useMyBookCommentListQuery(users_books_id);

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    MyBookCommentDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookCommentDeleteMutationRequestType
  >(
    [useMyBookCommentDeleteMutationKey, users_books_id, comment_id],
    myBookCommentDeleteAPI
  );

  useEffect(() => {
    if (isSuccess && data) {
      queryClient.invalidateQueries({
        queryKey: [useMyBookCommentListQueryKey],
        exact: true,
      });
      refetch();
      const { message, status } = data;
      addToast({ message, status });
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
    isSuccess,
  };
}
