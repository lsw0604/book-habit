import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { commentsReplyListAPI } from 'lib/api/comments';
import useToastHook from '@hooks/useToastHook';
import { queriesKey } from 'queries';

const { useCommentsReplyListQueryKey } = queriesKey.comments;

export default function useCommentsReplyListQuery(
  comment_id: CommentsReplyListQueryRequestType
) {
  const { addToast } = useToastHook();

  const { data, isError, isLoading, error, refetch, isFetching } = useQuery<
    CommentsReplyListQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyListQueryListType
  >(
    [useCommentsReplyListQueryKey, comment_id],
    () => commentsReplyListAPI(comment_id),
    {
      select: (response) => {
        const { reply_list } = response;
        return reply_list;
      },
    }
  );

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
