import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { loginAPI } from 'lib/api/auth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
import useToastHook from './useToastHook';

const REACT_QUERY_KEY = 'USE_LOGIN_HOOK';

export default function useLoginHook() {
  const setUserState = useSetRecoilState(userAtom);
  const { addToast } = useToastHook();
  const { isLoading, data, mutate } = useMutation<
    LoginResponseType,
    AxiosError | Error | null,
    LoginRequestType
  >([REACT_QUERY_KEY], loginAPI, {
    onSuccess: (data) => {
      const { id, email, name, status, message, age, gender, provider } = data;
      setUserState({ id, email, name, gender, age, isLogged: true, provider });
      addToast({ message, status });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const { message, status } = error.response.data;
      addToast({ message, status });
    },
  });

  return { isLoading, data, mutate };
}
