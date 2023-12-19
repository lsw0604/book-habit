import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import useToastHook from '@hooks/useToastHook';
import { profileLikeListAPI } from 'lib/api/auth';
import { queriesKey } from 'queries';

const { useProfileLikeQueryKey } = queriesKey.profile;

export default function useProfileLikeQuery(page: ProfileLikeQueryRequestType) {
  const { addToast } = useToastHook();

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery<
    ProfileLikeQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([useProfileLikeQueryKey, page], () => profileLikeListAPI(page), {
    staleTime: 2 * 60 * 1000,
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
