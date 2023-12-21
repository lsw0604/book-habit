import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import useModalHook from '@hooks/useModalHook';
import useMyBookHook from '@hooks/useMyBookHook';
import { myBookCommentUpdateAPI } from 'lib/api/myBook';
import { queriesKey, queryClient } from 'queries';

const { useMyBookCommentUpdateMutationKey, useMyBookCommentListQueryKey } =
  queriesKey.myBook;

export default function useMyBookCommentUpdateMutation() {
  const { addToast } = useToastHook();
  const { setModalState } = useModalHook();
  const { onChangeMyBookStateInitial } = useMyBookHook();

  const { mutate, isLoading, data, isSuccess, isError, error } = useMutation<
    MyBookCommentUpdateMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookCommentUpdateMutationRequestType
  >([useMyBookCommentUpdateMutationKey], myBookCommentUpdateAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries([useMyBookCommentListQueryKey]);
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      setModalState({ isOpen: false, type: undefined });
      addToast({ message, status });
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
