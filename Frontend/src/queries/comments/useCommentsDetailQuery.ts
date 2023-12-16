import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import useToastHook from '@hooks/useToastHook';
import { commentsDetailAPI } from 'lib/api/comments';
import { queriesKey } from 'queries';

const { useCommentsDetailQueryKey } = queriesKey.comments;

export default function useCommentsDetailQuery(
  comment_id: CommentsDetailQueryRequestType
) {
  const { addToast } = useToastHook();

  const { data, isLoading, isFetching, error, isError, refetch } = useQuery<
    CommentsDetailQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([useCommentsDetailQueryKey, comment_id], () =>
    commentsDetailAPI(comment_id)
  );

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}
