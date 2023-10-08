import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { commentsReplyListAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';

export default function useCommentsReplyListQuery(
  comment_id: CommentsReplyListQueryRequestType
) {
  const REACT_QUERY_KEY = 'USE_COMMENTS_REPLY_LIST_QUERY';
  const { addToast } = useToastHook();

  const { data, isError, isLoading, error, refetch, isFetching } = useQuery<
    CommentsReplyListQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyListQueryListType
  >([REACT_QUERY_KEY, comment_id], () => commentsReplyListAPI(comment_id), {
    select: ({ reply }) => {
      return reply;
    },
  });

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
