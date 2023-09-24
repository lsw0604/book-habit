import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { profileUpdateAPI } from 'lib/api/auth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
import useToastHook from '@hooks/useToastHook';
import { AxiosError } from 'axios';

export default function useProfileEditMutation() {
  const REACT_QUERY_KEY = 'USE_PROFILE_EDIT_MUTATION';
  const { addToast } = useToastHook();
  const setUserState = useSetRecoilState(userAtom);
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    ProfileEditMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ProfileEditMutationRequestType
  >([REACT_QUERY_KEY], profileUpdateAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status, profile } = data;
      addToast({ message, status });
      setUserState((prev: UserAtomType) => ({
        ...prev,
        profile,
      }));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
