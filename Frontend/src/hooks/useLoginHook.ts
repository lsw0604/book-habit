import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { loginAPI } from 'lib/api/auth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';

const REACT_QUERY_KEY = 'USE_LOGIN_HOOK';

export default function useLoginHook() {
  const setUserState = useSetRecoilState(userAtom);
  const { isLoading, data, mutate } = useMutation<
    LoginResponseType,
    AxiosError | null,
    LoginRequestType
  >([REACT_QUERY_KEY], loginAPI, {
    onSuccess: (data) => {
      console.log(data);
      const { id, email, name } = data;
      setUserState({ id, email, name, isLogged: true });
    },
    onError: (error: any) => {
      console.log(error.response.data);
    },
  });

  return { isLoading, data, mutate };
}
