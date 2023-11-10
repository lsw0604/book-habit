import useToastHook from '@hooks/useToastHook';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { commentsDetailAPI } from 'lib/api/comments';
import { useEffect } from 'react';

const REACT_QUERY_KEY = 'USE_COMMENTS_DETAIL_QUERY';

export default function useCommentsDetailQuery(
  comment_id: CommentsDetailQueryRequestType
) {
  const { addToast } = useToastHook();

  const { data, isLoading, isFetching, error, isError, refetch } = useQuery<
    CommentsDetailQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([REACT_QUERY_KEY, comment_id], () => commentsDetailAPI(comment_id));

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
