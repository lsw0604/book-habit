import useToastHook from '@hooks/useToastHook';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { commentsListAPI } from 'lib/api/comments';
import { useEffect } from 'react';

const REACT_QUERY_KEY = 'USE_COMMENTS_LIST_QUERY';

export default function useCommentsListQuery(filter: string[]) {
  const queryClient = new QueryClient();
  const { addToast } = useToastHook();

  const { data, isLoading, isFetching, error, isError, refetch, isSuccess } =
    useQuery<
      CommentsListQueryResponseType,
      AxiosError<{ message: string; status: StatusType }>
    >(
      [REACT_QUERY_KEY, dayjs().format('YYYY-MM-DD')],
      () => commentsListAPI(),
      {
        staleTime: 3 * 60 * 1000,
        cacheTime: 3 * 60 * 1000,
        select: ({ comments }) => {
          if (filter.length === 0) {
            return { comments };
          }

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
      }
    );

  useEffect(() => {
    if (isSuccess && data) {
      queryClient.invalidateQueries({
        queryKey: ['USE_COMMENTS_LIKE_LIST_QUERY'],
      });
    }
  }, [isSuccess, data]);

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
