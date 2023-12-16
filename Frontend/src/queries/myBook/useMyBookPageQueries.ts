import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';

import useToastHook from '@hooks/useToastHook';
import {
  myBookHistoryAPI,
  myBookInfoAPI,
  myBookTimeRangeAPI,
} from 'lib/api/myBook';
import { queriesKey } from 'queries';

const { info, history, time } = queriesKey.myBook.useMyBookPageQueriesKey;

const errorMessage: Record<
  'info' | 'history' | 'time',
  { message: string; status: StatusType }
> = {
  info: {
    message: 'MY BOOK INFO를 불러오는데 실패했습니다.',
    status: 'error',
  },
  history: {
    message: 'MY BOOK HISTORY를 불러오는데 실패했습니다.',
    status: 'error',
  },
  time: {
    message: 'MY BOOK TIME를 불러오는데 실패했습니다.',
    status: 'error',
  },
};

export default function useMyBookPageQueries(
  users_books_id: number,
  filtered?: string[]
) {
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
        queryKey: [info, users_books_id],
        queryFn: () => myBookInfoAPI(users_books_id),
        suspense: true,
      },
      {
        queryKey: [history, users_books_id],
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
        suspense: true,
      },
      {
        queryKey: [time, users_books_id],
        queryFn: () => myBookTimeRangeAPI(users_books_id),
        suspense: true,
      },
    ],
  });

  useEffect(() => {
    if (myBookHistoryIsError && myBookHistoryError) {
      addToast(errorMessage.history);
    }
  }, [myBookHistoryIsError, myBookHistoryError]);

  useEffect(() => {
    if (myBookInfoIsError && myBookInfoError) {
      addToast(errorMessage.info);
    }
  }, [myBookInfoIsError, myBookInfoError]);

  useEffect(() => {
    if (myBookTimeIsError && myBookTimeError) {
      addToast(errorMessage.time);
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
    myBookTimeData,
    myBookTimeIsLoading,
    myBookTimeIsError,
    myBookTimeError,
    myBookTimeRefetch,
    myBookTimeIsFetching,
  };
}
