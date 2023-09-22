import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { kakaoSignupAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';
import useUserStateHook from '@hooks/useUserStateHook';
import { useNavigate } from 'react-router-dom';

export default function useKakaoSignUpMutation() {
  const REACT_QUERY_KEY = 'USE_KAKAO_SIGNUP_MUTATION';
  const { addToast } = useToastHook();
  const { setUserState } = useUserStateHook();
  const navigate = useNavigate();

  const { isLoading, mutate, data, isSuccess, isError, error } = useMutation<
    KakaoSignUpMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    KakaoSignUpMutationRequestType
  >([REACT_QUERY_KEY], kakaoSignupAPI);

  useEffect(() => {
    if (isError && error && error.response?.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
      navigate('/search');
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status, age, email, gender, id, name, provider } = data;
      addToast({ message, status });
      setUserState({ age, email, name, gender, id, provider, isLogged: true });
    }
  }, [isSuccess, data]);

  return { isLoading, mutate, data, isSuccess, isError, error };
}
