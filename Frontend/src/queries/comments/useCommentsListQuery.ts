import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { commentsListAPI } from 'lib/api/comments';
import { useEffect } from 'react';

export default function useCommentsListQuery() {
  const REACT_QUERY_KEY = 'USE_COMMENTS_LIST_QUERY_KEY';

  const { data, isLoading, isFetching, error, isError } = useQuery<
    CommentsListResponseType,
    AxiosError,
    CommentsListType
  >([REACT_QUERY_KEY], () => commentsListAPI(), {
    select: ({ comments }) => {
      return comments;
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
  };
}
