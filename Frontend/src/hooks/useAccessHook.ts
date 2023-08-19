import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { accessAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';
import useToastHook from './useToastHook';

export default function useAccessHook() {
  const userSetState = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addToast } = useToastHook();

  const fetch = async () => {
    try {
      setIsLoading(true);
      const { age, email, gender, id, name, message, status, provider } =
        await accessAPI();
      if (message === 'ACCESS_TOKEN_VERIFIED' && status === 'success') {
        userSetState({
          age,
          email,
          gender,
          id,
          isLogged: true,
          name,
          provider,
        });
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.data.status) {
        addToast({ status: 'error', message: '로그인을 다시해주세요.' });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('ACCESS')) {
      fetch();
    }
  }, []);

  return isLoading;
}
