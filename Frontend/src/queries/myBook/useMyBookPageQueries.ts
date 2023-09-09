import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  myBookCommentsAPI,
  myBookHistoryAPI,
  myBookInfoAPI,
  myBookRatingAPI,
  myBookTimeRangeAPI,
} from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';
import dayjs from 'dayjs';

export default function useMyBookPageQueries(
  users_books_id: number,
  filtered?: string[]
) {
  const REACT_QUERY_KEY = {
    info: 'MY_BOOK_INFO',
    history: 'MY_BOOK_HISTORY',
    rating: 'MY_BOOK_RATING',
    time: 'MY_BOOK_TIME',
    comments: 'MY_BOOK_COMMENTS',
  };
  const { addToast } = useToastHook();

  const [
    {
      data: myBookInfoData,
      isLoading: myBookInfoIsLoading,
      isError: myBookInfoIsError,
      error: myBookInfoError,
    },
    {
      data: myBookHistoryData,
      isLoading: myBookHistoryIsLoading,
      isFetching: myBookHistoryIsFetching,
      isSuccess: myBookHistoryIsSuccess,
      isError: myBookHistoryIsError,
      error: myBookHistoryError,
      refetch: myBookHistoryRefetch,
    },
    {
      data: myBookRatingData,
      isLoading: myBookRatingIsLoading,
      isFetching: myBookRatingIsFetching,
      isSuccess: myBookRatingIsSuccess,
      isError: myBookRatingIsError,
      error: myBookRatingError,
      refetch: myBookRatingRefetch,
    },
    {
      data: myBookTimeData,
      isLoading: myBookTimeIsLoading,
      isError: myBookTimeIsError,
      error: myBookTimeError,
      refetch: myBookTimeRefetch,
      isFetching: myBookTimeIsFetching,
    },
    {
      data: myBookCommentsData,
      isLoading: myBookCommentsIsLoading,
      isError: myBookCommentsIsError,
      error: myBookCommentsError,
      refetch: myBookCommentsRefetch,
      isFetching: myBookCommentsIsFetching,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: [REACT_QUERY_KEY.info, users_books_id],
        queryFn: () => myBookInfoAPI(users_books_id),
        staleTime: 2 * 60 * 1000,
        cacheTime: 3 * 60 * 1000,
      },
      {
        queryKey: [REACT_QUERY_KEY.history, users_books_id],
        queryFn: () => myBookHistoryAPI(users_books_id),
        select: ({ books }: MyBookPageQueriesHistoryListResponseType) => {
          if (!filtered) {
            return [];
          } else if (filtered.includes('전체보기')) {
            return books;
          } else {
            return books.filter((book) => filtered.includes(book.status));
          }
        },
        staleTime: Infinity,
      },
      {
        queryKey: [REACT_QUERY_KEY.rating, users_books_id],
        queryFn: () => myBookRatingAPI(users_books_id),
      },
      {
        queryKey: [REACT_QUERY_KEY.time, users_books_id],
        queryFn: () => myBookTimeRangeAPI(users_books_id),
        select: ({
          startDate,
          endDate,
        }: MyBookPageQueriesTimeRangeResponseType) => {
          return {
            startDate: endDate
              ? dayjs(startDate)
                  .add(9, 'hour')
                  .add(1, 'day')
                  .toISOString()
                  .split('T')[0]
              : dayjs(startDate).add(9, 'hour').toISOString().split('T')[0],
            endDate: endDate
              ? dayjs(endDate)
                  .add(9, 'hour')
                  .add(-1, 'day')
                  .toISOString()
                  .split('T')[0]
              : new Date(),
          };
        },
      },
      {
        queryKey: [REACT_QUERY_KEY.comments, users_books_id],
        queryFn: () => myBookCommentsAPI(users_books_id),
        select: ({ comments }: MyBookPageQueriesCommentResponseType) => {
          return comments.map((comment) => {
            return {
              comment_id: comment.comment_id,
              comment: comment.comment,
              created_at: dayjs(comment.created_at)
                .add(9, 'hour')
                .toISOString()
                .split('T')[0],
              updated_at: comment.updated_at
                ? dayjs(comment.updated_at)
                    .add(9, 'hour')
                    .toISOString()
                    .split('T')[0]
                : undefined,
            };
          });
        },
      },
    ],
  });

  useEffect(() => {
    if (myBookRatingIsError && myBookRatingError) {
      addToast({
        message: 'MY BOOK RATING을 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [myBookRatingIsError, myBookRatingError]);

  useEffect(() => {
    if (myBookHistoryIsError && myBookHistoryError) {
      addToast({
        message: 'MY BOOK HISTORY를 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [myBookHistoryIsError, myBookHistoryError]);

  useEffect(() => {
    if (myBookInfoIsError && myBookInfoError) {
      addToast({
        message: 'MY BOOK INFO를 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [myBookInfoIsError, myBookInfoError]);

  useEffect(() => {
    if (myBookTimeIsError && myBookTimeError) {
      addToast({
        message: 'MY BOOK TIME를 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [myBookTimeIsError, myBookTimeError]);

  useEffect(() => {
    if (myBookCommentsIsError && myBookCommentsError) {
      addToast({
        message: 'MY BOOK COMMENTS를 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [myBookCommentsIsError, myBookCommentsError]);

  return {
    myBookInfoData,
    myBookInfoIsLoading,
    myBookInfoIsError,
    myBookInfoError,
    myBookHistoryData,
    myBookHistoryIsLoading,
    myBookHistoryIsFetching,
    myBookHistoryIsSuccess,
    myBookHistoryIsError,
    myBookHistoryError,
    myBookHistoryRefetch,
    myBookRatingData,
    myBookRatingIsLoading,
    myBookRatingIsFetching,
    myBookRatingIsSuccess,
    myBookRatingIsError,
    myBookRatingError,
    myBookRatingRefetch,
    myBookTimeData,
    myBookTimeIsLoading,
    myBookTimeIsError,
    myBookTimeError,
    myBookTimeRefetch,
    myBookTimeIsFetching,
    myBookCommentsData,
    myBookCommentsError,
    myBookCommentsIsError,
    myBookCommentsIsFetching,
    myBookCommentsIsLoading,
    myBookCommentsRefetch,
  };
}
