import useToastHook from '@hooks/useToastHook';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { profileReplyListAPI } from 'lib/api/auth';
import { useEffect } from 'react';

export default function useProfileReplyQuery(
  page: ProfileReplyQueryRequestType
) {
  const REACT_QUERY_KEY = 'USE_PROFILE_REPLY_QUERY';
  const { addToast } = useToastHook();

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery<
    ProfileReplyQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([REACT_QUERY_KEY, page], () => profileReplyListAPI(page), {
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
    data,
    refetch,
  };
}
