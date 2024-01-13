import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@hooks/useToastHook';
import { commentsListAPI } from 'lib/api/comments';
import { queriesKey } from 'queries';

const { useCommentsListQueryKey } = queriesKey.comments;

export default function useCommentsListQuery(filter: string[]) {
  const { addToast } = useToastHook();

  const { data, isLoading, isFetching, error, isError, refetch } = useQuery<
    CommentsListQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([useCommentsListQueryKey], () => commentsListAPI(), {
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    select: ({ comments }) => {
      if (filter.length === 0) return { comments };

      return {
        comments: comments.filter(
          (comment) =>
            filter.includes(comment.title) ||
            filter.includes(comment.status) ||
            filter.includes(comment.gender) ||
            filter.includes(comment.age_category)
        ),
      };
    },
    refetchOnMount: true,
  });

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
