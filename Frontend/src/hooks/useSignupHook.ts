import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signUpAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';

const REACT_QUERY_KEY = 'USE_SIGNUP_KEY';

export default function useSignupHook() {
  const { addToast } = useToastHook();

  const { isLoading, mutate, data } = useMutation<
    SignUpResponseType,
    AxiosError | Error | null,
    SignUpRequestType
  >([REACT_QUERY_KEY], signUpAPI, {
    onSuccess: (data) => {
      const { message, status } = data;
      addToast({ message, status });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const { message, status } = error.response.data;
      addToast({ message, status });
    },
  });

  return { isLoading, mutate, data };
}
