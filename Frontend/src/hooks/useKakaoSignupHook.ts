import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { kakaoSignupAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';
import { useNavigate } from 'react-router-dom';

const REACT_QUERY_KEY = 'USE_KAKAO_SIGNUP_KEY';

export default function useKakaoSignupHook() {
  const { addToast } = useToastHook();
  const navigate = useNavigate();

  const { isLoading, mutate, data, isSuccess } = useMutation<
    KakaoSignUpResponseType,
    AxiosError | Error | null,
    KakaoSignUpRequestType
  >([REACT_QUERY_KEY], kakaoSignupAPI, {
    onSuccess: (data) => {
      const { message, status } = data;
      addToast({ message, status });
      navigate('/');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const { message, status } = error.response.data;
      addToast({ message, status });
    },
  });

  return { isLoading, mutate, data, isSuccess };
}
