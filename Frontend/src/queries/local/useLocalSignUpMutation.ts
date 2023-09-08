import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { signUpAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';

export default function useLocalSignUpMutation() {
  const REACT_QUERY_KEY = 'USE_LOCAL_SIGNUP_MUTATION';
  const { addToast } = useToastHook();
  const navigate = useNavigate();

  const { isLoading, mutate, data, isSuccess, isError, error } = useMutation<
    LocalSignUpMutationResponseType,
    AxiosError,
    LocalSignUpMutationRequestType
  >([REACT_QUERY_KEY], signUpAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      navigate('/');
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({ message: '회원가입에 실패했습니다.', status: 'error' });
    }
  }, [isError, error]);

  return { isLoading, mutate, data, isSuccess };
}
