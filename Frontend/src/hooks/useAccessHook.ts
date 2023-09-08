import { useEffect, useState } from 'react';

import { accessAPI } from 'lib/api/auth';
import useUserStateHook from '@hooks/useUserStateHook';

export default function useAccessHook() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserState, onChangeUserStateInitial } = useUserStateHook();

  const fetch = async () => {
    try {
      setIsLoading(true);
      const { age, email, gender, id, name, message, status, provider } =
        await accessAPI();
      if (message === 'ACCESS_TOKEN_VERIFIED' && status === 'success') {
        setUserState({
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
      onChangeUserStateInitial();
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
