import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { kakaoCallbackAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';
import useToastHook from './useToastHook';

const REACT_QUERY_KEY = 'USE_KAKAO_CALLBACK_HOOK';

export default function useKakaoCallbackHook(code: string) {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userAtom);
  const { addToast } = useToastHook();

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(
    [REACT_QUERY_KEY],
    () => kakaoCallbackAPI(code),
    {
      onSuccess: (data) => {
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
        if (gender === null || age === null || name === null) {
          window.localStorage.setItem('ACCESS', access_jwt);
          setUserState({
            email,
            id,
            gender,
            age,
            name,
            isLogged: true,
            provider,
          });

          addToast({ message, status });
          return navigate('/register/kakao');
        } else {
          window.localStorage.setItem('ACCESS', access_jwt);
          setUserState({
            email,
            id,
            gender,
            age,
            name,
            isLogged: true,
            provider,
          });
          addToast({ message, status });
          return navigate('/');
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        if (error.response.status === 403) {
          queryClient.removeQueries([REACT_QUERY_KEY]);
          return navigate('/');
        }
        console.log('[useKakaoCallbackHook][ERROR]', error);
      },
    }
  );
  return {
    isLoading,
    data,
  };
}
