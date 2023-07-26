import { useQuery } from '@tanstack/react-query';
import { accessAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';

const REACT_QUERY_KEY = 'USE_ACCESS_KEY';

export default function useAccessHook() {
  const userSetState = useSetRecoilState(userAtom);

  if (document.cookie.includes('access')) {
    const { isLoading, data } = useQuery<
      AccessResponseType,
      AxiosError | Error | null
    >([REACT_QUERY_KEY], accessAPI, {
      onSuccess: (data) => {
        const { email, name, id } = data;
        userSetState({ email, name, id, isLogged: true });
      },
      onError: (error) => {
        console.log('sssssssss', error);
      },
    });
    return { isLoading, data };
  } else {
    return null;
  }
}
