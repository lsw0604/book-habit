import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { signUpAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';
import { queriesKey } from 'queries';

const { useLocalRegisterMutationKey } = queriesKey.local;

export default function useLocalRegisterMutation() {
  const { addToast } = useToastHook();
  const navigate = useNavigate();

  const { isLoading, mutate, data, isSuccess, isError, error } = useMutation<
    LocalSignUpMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    LocalSignUpMutationRequestType
  >([useLocalRegisterMutationKey], signUpAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      if (data.message === '회원가입에 성공 하셨습니다.') {
        navigate('/search');
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return { isLoading, mutate, data, isSuccess };
}
