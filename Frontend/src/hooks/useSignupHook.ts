import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signUpAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';
import { useNavigate } from 'react-router-dom';

const REACT_QUERY_KEY = 'USE_SIGNUP_KEY';

export default function useSignupHook() {
  const { addToast } = useToastHook();
  const navigate = useNavigate();

  const { isLoading, mutate, data, isSuccess } = useMutation<
    SignUpResponseType,
    AxiosError | Error | null,
    SignUpRequestType
  >([REACT_QUERY_KEY], signUpAPI, {
    onSuccess: (data) => {
      const { message, status } = data;
      addToast({ message, status });
      navigate('/');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const { message, status } = error.response.data;
      addToast({ message, status });
    },
  });

  return { isLoading, mutate, data, isSuccess };
}
