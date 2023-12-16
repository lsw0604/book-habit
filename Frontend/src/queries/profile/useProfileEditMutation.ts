import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { userAtom } from 'recoil/user';
import useToastHook from '@hooks/useToastHook';
import { profileUpdateAPI } from 'lib/api/auth';
import { queriesKey } from 'queries';

const { useProfileEditMutationKey } = queriesKey.profile;

export default function useProfileEditMutation() {
  const { addToast } = useToastHook();
  const setUserState = useSetRecoilState(userAtom);

  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    ProfileEditMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ProfileEditMutationRequestType
  >([useProfileEditMutationKey], profileUpdateAPI);

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
