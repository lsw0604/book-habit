import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';

export default function KakaoRegisterLayout() {
  const userState = useRecoilValue(userAtom);
  const { isLogged, provider, age, name, gender } = userState;

  return (isLogged && provider === 'kakao' && age === null) ||
    (isLogged && provider === 'kakao' && name === null) ||
    (isLogged && provider === 'kakao' && gender === null) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}