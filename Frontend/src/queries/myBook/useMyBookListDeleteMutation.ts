import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import { myBookListDeleteAPI } from 'lib/api/myBook';
import { queriesKey, queryClient } from 'queries';

const { myBook, comments } = queriesKey;

export default function useMyBookListDeleteMutation(
  users_books_id: MyBookListDeleteMutationRequestType
) {
  const navigate = useNavigate();
  const { addToast } = useToastHook();

  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation<
    MyBookListDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookListDeleteMutationRequestType
  >(
    [myBook.useMyBookListDeleteMutationKey, users_books_id],
    () => myBookListDeleteAPI(users_books_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [myBook.useMyBookListInfinityQueryKey],
        });
        queryClient.invalidateQueries({
          queryKey: [comments.useCommentsListQueryKey],
        });
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
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return { mutate, isLoading, isSuccess };
}
