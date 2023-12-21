import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { myBookCommentDeleteAPI } from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';
import { queriesKey, queryClient } from 'queries';

const { useMyBookCommentDeleteMutationKey, useMyBookCommentListQueryKey } =
  queriesKey.myBook;

export default function useMyBookCommentDeleteMutation(
  users_books_id: number,
  comment_id: number
) {
  const { addToast } = useToastHook();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    MyBookCommentDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookCommentDeleteMutationRequestType
  >(
    [useMyBookCommentDeleteMutationKey, users_books_id, comment_id],
    myBookCommentDeleteAPI,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [useMyBookCommentListQueryKey],
        });
      },
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
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
