import { useQuery } from '@tanstack/react-query';
import { myBookExistAPI } from 'lib/api/myBook';

interface IMyBooksAlreadyResponse {
  status: '다읽음' | '읽는중' | '읽고싶음';
  message?: string;
}

export default function useExistBookHook(isbn: string) {
  const REACT_QUERY_KEY = 'MY_BOOKS_EXIST';
  const { data, isLoading, isFetching, refetch } =
    useQuery<IMyBooksAlreadyResponse>(
      [REACT_QUERY_KEY, isbn],
      () => myBookExistAPI(isbn),
      {
        enabled: false,
      }
    );

  const filteringData =
    data && data.message
      ? {
          result: data.message,
          disabled: false,
        }
      : {
          result:
            data && ` 현재 나의 서재에 ${data.status}상태로 저장됐습니다.`,
          disabled: true,
        };

  return {
    filteringData,
    isLoading,
    isFetching,
    refetch,
  };
}
