import { useQuery } from '@tanstack/react-query';
import { myBookCommentsAPI } from 'lib/api/myBook';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

export default function useMyBookCommentQuery(users_books_id: number) {
  const REACT_QUERY_KEY = 'USE_MY_BOOK_COMMENT_QUERY';
  const { data, isSuccess, error, isError, refetch, isFetching, isLoading } =
    useQuery<
      MyBookCommentQueryResponseType,
      AxiosError,
      MyBookCommentQueryListType
    >(
      [REACT_QUERY_KEY, users_books_id],
      () => myBookCommentsAPI(users_books_id),
      {
        select: ({ comments }) => {
          const newComments = comments.map((comment) => {
            return {
              comment_id: comment.comment_id,
              comment: comment.comment,
              comment_is_open: comment.comment_is_open,
              created_at: dayjs(comment.created_at).format(
                'YYYY년 MM월 DD일 HH시 mm분'
              ),
              updated_at: comment.updated_at
                ? dayjs(comment.updated_at).format('YYYY년 MM월 DD일 HH시 mm분')
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
