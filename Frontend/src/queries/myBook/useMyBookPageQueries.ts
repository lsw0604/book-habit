import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  myBookHistoryAPI,
  myBookInfoAPI,
  myBookTimeRangeAPI,
} from 'lib/api/myBook';
import useToastHook from '@hooks/useToastHook';

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
        queryKey: [REACT_QUERY_KEY.time, users_books_id],
        queryFn: () => myBookTimeRangeAPI(users_books_id),
      },
    ],
  });

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
      console.log(myBookInfoError);
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
