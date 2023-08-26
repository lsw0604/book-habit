import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { loginAPI } from 'lib/api/auth';

const REACT_QUERY_KEY = 'USE_LOGIN_HOOK';

export default function useLoginHook() {
  const { isLoading, data, mutate, isSuccess, isError, error } = useMutation<
    LoginResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    LoginRequestType
  >([REACT_QUERY_KEY], loginAPI);

  return { isLoading, data, mutate, isError, error, isSuccess };
}
