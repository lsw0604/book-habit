import { useQuery } from '@tanstack/react-query';
import { refreshAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

const REACT_QUERY_KEY = 'USE_Refresh_KEY';

export default function useRefreshHook() {
  const userSetState = useSetRecoilState(userAtom);

  const { isLoading, data, refetch, isError, error } = useQuery<
    AccessResponseType,
    AxiosError | Error | null
  >([REACT_QUERY_KEY], refreshAPI, {
    onSettled: (config) => {
      console.log('onSettled', config);
    },
    onSuccess: (config) => {
      console.log('onSuccess', config);
      const { id, email, name } = config;
      userSetState({ id, name, email, isLogged: true });
    },
    onError: (error) => {
      console.log('useAccess err', error);
    },
  });

  return { isLoading, data, refetch };
}
