import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useToastHook from '@hooks/useToastHook';
import { useMutation } from '@tanstack/react-query';
import { profileInfoUpdateAPI } from 'lib/api/auth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
import { modalAtom } from 'recoil/modal';

const REACT_QUERY_KEY = 'USE_PROFILE_INFO_EDIT_MUTATION';

export default function useProfileInfoEditMutation() {
  const { addToast } = useToastHook();
  const setUserState = useSetRecoilState(userAtom);
  const setModalState = useSetRecoilState(modalAtom);

  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    ProfileInfoEditMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ProfileInfoEditMutationRequestType
  >([REACT_QUERY_KEY], profileInfoUpdateAPI);

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
