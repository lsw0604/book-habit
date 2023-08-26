import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { kakaoSignupAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';
import { userAtom } from 'recoil/user';

const REACT_QUERY_KEY = 'USE_KAKAO_SIGNUP_KEY';

export default function useKakaoSignupHook() {
  const { addToast } = useToastHook();
  const userSetState = useSetRecoilState(userAtom);

  const { isLoading, mutate, data, isSuccess, isError, error } = useMutation<
    KakaoSignUpResponseType,
    AxiosError | Error | null,
    KakaoSignUpRequestType
  >([REACT_QUERY_KEY], kakaoSignupAPI, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const { message, status } = error.response.data;
      addToast({ message, status });
    },
  });

  if (isSuccess) {
    const { message, status, age, email, gender, id, name, provider } = data;

    addToast({ message, status });
    userSetState({ age, email, gender, id, name, provider, isLogged: true });
  }

  return { isLoading, mutate, data, isSuccess, isError, error };
}
