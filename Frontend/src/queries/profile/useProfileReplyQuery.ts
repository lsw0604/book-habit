import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import useToastHook from '@hooks/useToastHook';
import { profileReplyListAPI } from 'lib/api/auth';
import { queriesKey } from 'queries';

const { useProfileReplyQueryKey } = queriesKey.profile;

export default function useProfileReplyQuery(
  page: ProfileReplyQueryRequestType
) {
  const { addToast } = useToastHook();

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery<
    ProfileReplyQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([useProfileReplyQueryKey, page], () => profileReplyListAPI(page), {
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
