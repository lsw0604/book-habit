import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { myBookCommentsAPI } from 'lib/api/myBook';
import { queriesKey } from 'queries';

const { useMyBookCommentListQueryKey } = queriesKey.myBook;

export default function useMyBookCommentListQuery(users_books_id: number) {
  const { data, isSuccess, error, isError, refetch, isFetching, isLoading } =
    useQuery<
      MyBookCommentQueryResponseType,
      AxiosError,
      MyBookCommentQueryListType
    >(
      [useMyBookCommentListQueryKey, users_books_id],
      () => myBookCommentsAPI(users_books_id),
      {
        select: ({ comments }) => {
          const newComments = comments.map((comment) => {
            return {
              comment_id: comment.comment_id,
              comment: comment.comment,
              comment_is_open: comment.comment_is_open,
              created_at: dayjs(comment.created_at).format(
                'YYYY/MM/DD-HH:mm:ss'
              ),
              updated_at: comment.updated_at
                ? dayjs(comment.updated_at).format('YYYY/MM/DD-HH:mm:ss')
                : undefined,
              rating: comment.rating,
              status: comment.status,
            };
          });
          return newComments;
        },
      }
    );

  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    error,
    isError,
    refetch,
  };
}
