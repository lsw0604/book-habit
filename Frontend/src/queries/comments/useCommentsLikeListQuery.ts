import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import { commentsLikeListAPI } from 'lib/api/comments';
import { queriesKey } from 'queries';

const { useCommentsLikeListQueryKey } = queriesKey.comments;

export default function useCommentsLikeListQuery(
  comment_id: CommentsLikeListRequestType
) {
  const { addToast } = useToastHook();

  const { data, isFetching, isLoading, refetch, isError, error } = useQuery<
    CommentsLikeListQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsLikeListType
  >(
    [useCommentsLikeListQueryKey, comment_id],
    () => commentsLikeListAPI(comment_id),
    {
      select: ({ comment_likes }) => {
        return comment_likes;
      },
      staleTime: 3 * 60 * 1000,
      cacheTime: 3 * 60 * 1000,
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
    isLoading,
    isFetching,
    refetch,
  };
}
