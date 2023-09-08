import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { kakaoCallbackAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';
import { AxiosError } from 'axios';
import useUserStateHook from '@hooks/useUserStateHook';

export default function useKakaoCallbackQuery(code: string) {
  const REACT_QUERY_KEY = 'USE_KAKAO_CALLBACK_QUERY';
  const queryClient = useQueryClient();
  const { addToast } = useToastHook();
  const { setUserState } = useUserStateHook();

  const { isLoading, data, isSuccess, isError, error } = useQuery<
    KakaoCallbackQueryResponseType,
    AxiosError
  >([REACT_QUERY_KEY], () => kakaoCallbackAPI(code), {
    onError: () => {
      queryClient.refetchQueries([REACT_QUERY_KEY]);
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const {
        email,
        id,
        gender,
        age,
        name,
        provider,
        message,
        status,
        access_jwt,
      } = data;
      window.localStorage.setItem('ACCESS', access_jwt);
      setUserState({ email, id, gender, age, name, isLogged: true, provider });
      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({
        message: '카카오 로그인에 오류가 발생했습니다.',
        status: 'error',
      });
    }
  }, [isError, error]);

  return {
    isSuccess,
    isError,
    error,
    isLoading,
    data,
  };
}
