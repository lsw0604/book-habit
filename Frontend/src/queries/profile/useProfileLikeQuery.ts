import useToastHook from '@hooks/useToastHook';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { profileLikeListAPI } from 'lib/api/auth';
import { useEffect } from 'react';

const REACT_QUERY_KEY = 'USE_PROFILE_LIKE_QUERY';

export default function useProfileLikeQuery(page: ProfileLikeQueryRequestType) {
  const { addToast } = useToastHook();

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery<
    ProfileLikeQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([REACT_QUERY_KEY, page], () => profileLikeListAPI(page), {
    staleTime: 1 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    enabled: false,
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
    data,
    refetch,
  };
}
