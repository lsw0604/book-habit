import { useQuery } from '@tanstack/react-query';
import { myBooksAlreadyAPI } from 'lib/api/book';
import dateParse from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';
import { differenceInDays } from 'date-fns';

interface IMyBooksAlreadyResponse {
  status: '다읽음' | '읽는중' | '읽고싶음';
  start_date: string | null;
  end_date: string | null;
  rating: number | null;
  page: number | null;
  message?: string;
}

export default function useAlreadyBookHook(isbn: string) {
  const REACT_QUERY_KEY = 'MY_BOOKS_ALREADY';
  const { data, isLoading, isFetching, refetch } =
    useQuery<IMyBooksAlreadyResponse>([REACT_QUERY_KEY, isbn], () =>
      myBooksAlreadyAPI(isbn)
    );

  const filteredString = ({
    status,
    start_date,
    end_date,
    rating,
    page,
  }: IMyBooksAlreadyResponse) => {
    switch (status) {
      case '다읽음': {
        const parseDateStart = addHours(dateParse(start_date as string), 9);
        const parseDateEnd = addHours(dateParse(end_date as string), 9);
        const [startYear, startMonth, startDay] = parseDateStart
          .toISOString()
          .split('T')[0]
          .split('-');
        const [endYear, endMonth, endDay] = parseDateEnd
          .toISOString()
          .split('T')[0]
          .split('-');
        const dayDiff = differenceInDays(parseDateEnd, parseDateStart);

        return `${startYear}년 ${startMonth}월 ${startDay}일 부터 읽기 시작해서 ${endYear}년 ${endMonth}월 ${endDay}일 까지 총 ${dayDiff}일 동안 읽고 평점 ${rating}을 준 책 입니다.`;
      }
      case '읽는중': {
        const parseDateStart = addHours(dateParse(start_date as string), 9);
        const [startYear, startMonth, startDay] = parseDateStart
          .toISOString()
          .split('T')[0]
          .split('-');
        const dayDiff = differenceInDays(new Date(), parseDateStart);

        return `${startYear}년 ${startMonth}월 ${startDay}일 부터 읽기 시작해서 ${dayDiff}일 동안 읽고 벌써 ${page} 페이지를 읽은 책 입니다.`;
      }
      case '읽고싶음': {
        return `1 ~ 5점 사이에 점수를 매긴다면 ${rating}점 만큼 기대중인 책이에요.`;
      }
      default:
        return null;
    }
  };

  const filteringData = data?.message
    ? {
        result: data.message,
        disabled: false,
      }
    : {
        result: filteredString({
          status: data?.status as '다읽음' | '읽는중' | '읽고싶음',
          start_date: data?.start_date as string | null,
          end_date: data?.end_date as string | null,
          rating: data?.rating as number | null,
          page: data?.page as number | null,
        }),
        disabled: true,
      };

  return {
    filteringData,
    isLoading,
    isFetching,
    refetch,
  };
}
