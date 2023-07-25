import { useQuery } from '@tanstack/react-query';
import { accessAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

const REACT_QUERY_KEY = 'USE_ACCESS_KEY';
const REACT_QUERY_TIME = 1000 * 60 * 10;

export default function useAccessHook() {
  const userSetState = useSetRecoilState(userAtom);

  const { isLoading, data, refetch } = useQuery<
    AccessResponseType,
    AxiosError | Error | null
  >([REACT_QUERY_KEY], accessAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    refetchInterval: REACT_QUERY_TIME,
    refetchIntervalInBackground: false,
    staleTime: REACT_QUERY_TIME,
    cacheTime: REACT_QUERY_TIME,
    onSuccess: (data) => {
      const { email, name, id } = data;
      if (id) {
        userSetState({ email, name, id, isLogged: true });
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log('sssssssss', error);
    },
  });

  useEffect(() => {
    if (document.cookie.includes('access')) {
      refetch();
    }
  }, []);

  return { isLoading, data };
}
