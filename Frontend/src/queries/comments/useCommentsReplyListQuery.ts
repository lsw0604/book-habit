import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { commentsReplyListAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';

const REACT_QUERY_KEY = 'USE_COMMENTS_REPLY_LIST_QUERY';

export default function useCommentsReplyListQuery(
  comment_id: CommentsReplyListQueryRequestType
) {
  const { addToast } = useToastHook();

  const { data, isError, isLoading, error, refetch, isFetching } = useQuery<
    CommentsReplyListQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([REACT_QUERY_KEY, comment_id], () => commentsReplyListAPI(comment_id));

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    data,
    refetch,
    isLoading,
    isFetching,
  };
}
