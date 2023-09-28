import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { commentsListAPI } from 'lib/api/comments';
import { useEffect } from 'react';

export default function useCommentsListQuery() {
  const REACT_QUERY_KEY = 'USE_COMMENTS_LIST_QUERY';

  const { data, isLoading, isFetching, error, isError, refetch } = useQuery<
    CommentsListQueryResponseType,
    AxiosError,
    CommentsListType
  >([REACT_QUERY_KEY], () => commentsListAPI(), {
    select: ({ comments }) => {
      return comments.reverse();
    },
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
  });

  useEffect(() => {
    if (isError && error) {
      console.log(error);
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}
