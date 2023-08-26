import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
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
  >([REACT_QUERY_KEY], signUpAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      navigate('/');
    }
  }, [isSuccess, data]);

  return { isLoading, mutate, data, isSuccess };
}
