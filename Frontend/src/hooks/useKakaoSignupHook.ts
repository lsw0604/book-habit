import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { kakaoSignupAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';

const REACT_QUERY_KEY = 'USE_KAKAO_SIGNUP_KEY';

export default function useKakaoSignupHook() {
  const { addToast } = useToastHook();

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

  return { isLoading, mutate, data, isSuccess, isError, error };
}
