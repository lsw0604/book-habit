import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { accessAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';

export default function useAccessHook() {
  const userSetState = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      userSetState({
        age: 0,
        email: '',
        gender: '',
        id: 0,
        isLogged: false,
        name: '',
        provider: '',
      });
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
