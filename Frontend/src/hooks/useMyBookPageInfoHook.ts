import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  myBookHistoryAPI,
  myBookInfoAPI,
  myBookRatingAPI,
  myBookTimeRangeAPI,
} from 'lib/api/myBook';
import useToastHook from './useToastHook';
import dayjs from 'dayjs';

export default function useMyBookPageInfoHook(
  users_books_id: number,
  filtered?: string[]
) {
  const REACT_QUERY_KEY = {
    info: 'MY_BOOK_PAGE_INFO',
    history: 'MY_BOOK_HISTORY',
    rating: 'MY_BOOK_RATING',
    time: 'MY_BOOK_TIME',
  };
  const { addToast } = useToastHook();

  const isNullFilter = filtered === null ? [] : filtered;

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
  ] = useQueries({
    queries: [
      {
        queryKey: [REACT_QUERY_KEY.info, users_books_id],
        queryFn: () => myBookInfoAPI(users_books_id),
        staleTime: 2 * 60 * 1000,
        cacheTime: 3 * 60 * 1000,
      },
      {
        queryKey: [REACT_QUERY_KEY.history, users_books_id, isNullFilter],
        queryFn: () => myBookHistoryAPI(users_books_id),
        select: ({ books }: MyBookHistoryListResponseType) => {
          if (isNullFilter && isNullFilter.includes('전체보기')) {
            return books;
          } else if (isNullFilter && isNullFilter.length === 0) {
            return [];
          } else {
            return books.filter(
              (book) => isNullFilter && isNullFilter.includes(book.status)
            );
          }
        },
        staleTime: 5 * 1000,
        cacheTime: 6 * 1000,
      },
      {
        queryKey: [REACT_QUERY_KEY.rating, users_books_id],
        queryFn: () => myBookRatingAPI(users_books_id),
      },
      {
        queryKey: [REACT_QUERY_KEY.time, users_books_id],
        queryFn: () => myBookTimeRangeAPI(users_books_id),
        select: ({ startDate, endDate }: MyBookTimeRangeResponseType) => {
          return {
            startDate: dayjs(startDate)
              .add(9, 'hour')
              .add(1, 'day')
              .toISOString()
              .split('T')[0],
            endDate: dayjs(endDate)
              .add(9, 'hour')
              .add(-1, 'day')
              .toISOString()
              .split('T')[0],
          };
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
        message: 'TIME_RANGE를 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [myBookTimeIsError, myBookTimeError]);

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
  };
}
