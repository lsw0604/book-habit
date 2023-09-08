import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';

export default function useUserStateHook() {
  const [userState, setUserState] = useRecoilState(userAtom);

  const onChangeUserStateInitial = () => {
    setUserState({
      age: 0,
      email: '',
      gender: '',
      id: 0,
      isLogged: false,
      name: '',
      provider: '',
    });
  };

  return {
    userState,
    setUserState,
    onChangeUserStateInitial,
  };
}
