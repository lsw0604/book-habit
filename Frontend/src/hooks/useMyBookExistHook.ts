import { useQuery } from '@tanstack/react-query';
import { myBookExistAPI } from 'lib/api/myBook';

interface IMyBooksAlreadyResponse {
  status: '다읽음' | '읽는중' | '읽고싶음';
  message?: string;
}

export default function useMyBookExist(isbn: string) {
  const REACT_QUERY_KEY = 'MY_BOOKS_EXIST';
  const { data, isLoading, isFetching, isSuccess } =
    useQuery<IMyBooksAlreadyResponse>(
      [REACT_QUERY_KEY, isbn],
      () => myBookExistAPI(isbn),
      {
        staleTime: 5 * 1000,
        cacheTime: 3 * 1000,
      }
    );
  return {
    data,
    isLoading,
    isFetching,
  };
}
