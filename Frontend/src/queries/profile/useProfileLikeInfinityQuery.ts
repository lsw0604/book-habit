import useToastHook from '@hooks/useToastHook';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { profileLikeListAPI } from 'lib/api/auth';
import { useEffect } from 'react';

export default function useProfileLikeInfinityQuery() {
  const REACT_QUERY_KEY = 'USE_PROFILE_LIKE_INFINITY_QUERY';
  const { addToast } = useToastHook();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    isFetching,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    isError,
    error,
  } = useInfiniteQuery<
    ProfileLikeInfinityQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([REACT_QUERY_KEY], ({ pageParam = 1 }) => profileLikeListAPI(pageParam), {
    getNextPageParam: (response) => response.nextPage,
    getPreviousPageParam: (response) => response.prevPage,
    staleTime: 1 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    isLoading,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    data,
  };
}
