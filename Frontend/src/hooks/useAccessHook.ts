import { useEffect } from 'react';

import { accessAPI } from 'lib/api/auth';
import useUserStateHook from '@hooks/useUserStateHook';

export default function useAccessHook() {
  const { setUserState, onChangeUserStateInitial } = useUserStateHook();

  const fetch = async () => {
    try {
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
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('access hook', err);
      if (err && err.response && err.response.data) {
        onChangeUserStateInitial();
      }
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('ACCESS')) {
      fetch();
    }
  }, []);
}
