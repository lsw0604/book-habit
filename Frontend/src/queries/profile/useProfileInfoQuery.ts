import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { profileInfoAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';

export default function useProfileInfoQuery() {
  const REACT_QUERY_KEY = 'USE_PROFILE_INFO_QUERY';
  const { addToast } = useToastHook();
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery<
    ProfileInfoQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([REACT_QUERY_KEY], profileInfoAPI);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    isLoading,
    data,
    isFetching,
    refetch,
  };
}
