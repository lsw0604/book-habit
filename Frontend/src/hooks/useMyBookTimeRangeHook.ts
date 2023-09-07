import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { myBookTimeRangeAPI } from 'lib/api/myBook';
import useToastHook from './useToastHook';
import dayjs from 'dayjs';

export default function useMyBookTimeRangeHook(
  users_books_id: MyBookTimeRangeRequestType
) {
  const REACT_QUERY_KEY = 'MY_BOOK_TIME_RANGE';
  const { addToast } = useToastHook();
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<
    MyBookTimeRangeResponseType,
    AxiosError
  >(
    [REACT_QUERY_KEY, users_books_id],
    () => myBookTimeRangeAPI(users_books_id),
    {
      select: ({ startDate, endDate }) => {
        return {
          startDate: dayjs(startDate)
            .add(9, 'hour')
            .toISOString()
            .split('T')[0],
          endDate: dayjs(endDate).add(9, 'hour').toISOString().split('T')[0],
        };
      },
    }
  );

  useEffect(() => {
    if (isError && error) {
      addToast({
        message: 'TIME_RANGE를 불러오는데 실패했습니다.',
        status: 'error',
      });
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
    refetch,
    isFetching,
  };
}
