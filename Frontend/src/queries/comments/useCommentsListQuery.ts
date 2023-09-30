import { QueryClient, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { commentsListAPI } from 'lib/api/comments';
import { useEffect } from 'react';

export default function useCommentsListQuery() {
  const REACT_QUERY_KEY = 'USE_COMMENTS_LIST_QUERY';
  const queryClient = new QueryClient();

  const { data, isLoading, isFetching, error, isError, refetch } = useQuery<
    CommentsListQueryResponseType,
    AxiosError,
    CommentsListType
  >([REACT_QUERY_KEY], () => commentsListAPI(), {
    select: ({ comments }) => {
      return comments;
    },
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['USE_COMMENTS_LIKE_LIST_QUERY'],
      });
    },
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
