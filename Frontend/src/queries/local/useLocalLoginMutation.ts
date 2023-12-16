import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { loginAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';
import useUserStateHook from '@hooks/useUserStateHook';
import { queriesKey } from 'queries';

const { useLocalLoginMutationKey } = queriesKey.local;

export default function useLocalLoginMutation() {
  const { addToast } = useToastHook();
  const { setUserState } = useUserStateHook();
  const { isLoading, data, mutate, isSuccess, isError, error } = useMutation<
    LocalLoginMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    LocalLoginMutationRequestType
  >([useLocalLoginMutationKey], loginAPI);

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
