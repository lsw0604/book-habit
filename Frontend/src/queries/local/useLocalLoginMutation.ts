import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { loginAPI } from 'lib/api/auth';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import useUserStateHook from '@hooks/useUserStateHook';

const REACT_QUERY_KEY = 'USE_LOCAL_LOGIN_MUTATION';

export default function useLocalLoginMutation() {
  const { addToast } = useToastHook();
  const { setUserState } = useUserStateHook();
  const { isLoading, data, mutate, isSuccess, isError, error } = useMutation<
    LocalLoginMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    LocalLoginMutationRequestType
  >([REACT_QUERY_KEY], loginAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const {
        id,
        email,
        access_jwt,
        age,
        gender,
        message,
        name,
        provider,
        status,
        profile,
      } = data;
      window.localStorage.setItem('ACCESS', access_jwt);
      setUserState({
        age,
        id,
        email,
        gender,
        name,
        provider,
        isLogged: true,
        profile,
      });
      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.status === 403) {
      const message = error.response.data.message;
      const status = error.response.data.status;

      addToast({ message, status });
    }
  }, [isError, error]);

  return { isLoading, data, mutate, isError, error, isSuccess };
}
