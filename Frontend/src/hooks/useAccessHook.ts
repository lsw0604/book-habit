import { useQuery } from '@tanstack/react-query';
import { accessAPI, refreshAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

const REACT_QUERY_KEY = 'USE_ACCESS_KEY';

export default function useAccessHook() {
  const userSetState = useSetRecoilState(userAtom);

  const { isLoading, isError, data, error, isFetching } = useQuery<
    AccessResponseType,
    AxiosError | Error | null
  >([REACT_QUERY_KEY], accessAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: false,
    onError: (error) => {
      if (error?.message === 'REFRESH_TOKEN_VERIFIED') {
        const { email, name, id } = error as AccessResponseType;
        userSetState({ email, id, name, isLogged: true });
      }
    },
    onSuccess: (config) => {
      const { email, id, name } = config;
      userSetState({ email, id, name, isLogged: true });
    },
  });

  return { isLoading, isError, data, error, isFetching };
}
