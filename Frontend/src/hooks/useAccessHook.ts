import { useEffect, useState } from 'react';

import { accessAPI } from 'lib/api/auth';
import useUserStateHook from '@hooks/useUserStateHook';

export default function useAccessHook() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserState, onChangeUserStateInitial } = useUserStateHook();

  const fetch = async () => {
    try {
      setIsLoading(true);
      const {
        age,
        email,
        gender,
        id,
        name,
        message,
        status,
        provider,
        profile,
      } = await accessAPI();
      if (message === 'ACCESS_TOKEN_VERIFIED' && status === 'success') {
        setUserState({
          age,
          email,
          gender,
          id,
          isLogged: true,
          name,
          provider,
          profile,
        });
        setIsLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err && err.response && err.response.data) {
        onChangeUserStateInitial();
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return isLoading;
}
