import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { accessAPI } from 'lib/api/auth';
import { userAtom } from 'recoil/user';

export default function useAccessHook() {
  const userSetState = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetch = async () => {
    try {
      const { age, email, gender, id, name, message, status } =
        await accessAPI();
      if (message === 'ACCESS_TOKEN_VERIFIED' && status === 'success') {
        userSetState({ age, email, gender, id, isLogged: true, name });
      }
    } catch (err) {
      const { age, email, gender, id, name, message, status } =
        err as LoginResponseType;
      if (message === 'REFRESH_TOKEN_VERIFIED' && status === 'success') {
        userSetState({ age, email, gender, id, isLogged: true, name });
      }
      if (message === 'LOGOUT' && status === 'success') {
        userSetState({
          age: 0,
          email: '',
          id: 0,
          isLogged: false,
          name: '',
          gender: '',
        });
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch().then(() => setIsLoading(false));
  }, []);

  return isLoading;
}
