import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import useToastHook from '@hooks/useToastHook';
import { userAtom } from 'recoil/user';
import { modalAtom } from 'recoil/modal';
import { profileInfoUpdateAPI } from 'lib/api/auth';
import { queriesKey } from 'queries';

const { useProfileInfoEditMutationKey } = queriesKey.profile;

export default function useProfileInfoEditMutation() {
  const { addToast } = useToastHook();
  const setUserState = useSetRecoilState(userAtom);
  const setModalState = useSetRecoilState(modalAtom);

  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    ProfileInfoEditMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ProfileInfoEditMutationRequestType
  >([useProfileInfoEditMutationKey], profileInfoUpdateAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status, name, age, gender } = data;

      addToast({ message, status });
      setUserState((prev: UserAtomType) => ({
        ...prev,
        name,
        age,
        gender,
      }));
      setModalState({ isOpen: false, type: undefined });
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
