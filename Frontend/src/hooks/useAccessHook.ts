import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

import { accessAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';

const REACT_QUERY_KEY = 'USE_ACCESS_KEY';

export default function useAccessHook() {
  const userSetState = useSetRecoilState(userAtom);

  const { isLoading, isError, data, error, isFetching } = useQuery<
    AccessResponseType,
    AxiosError | Error | null
  >([REACT_QUERY_KEY], accessAPI, {
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      if (error?.message === 'REFRESH_TOKEN_VERIFIED') {
        const { email, name, id, age, gender } = error as AccessResponseType;
        userSetState({ email, id, name, isLogged: true, age, gender });
      }
    },
    onSuccess: (config) => {
      const { email, id, name, age, gender } = config;
      userSetState({ email, id, name, isLogged: true, age, gender });
    },
  });

  return { isLoading, isError, data, error, isFetching };
}
