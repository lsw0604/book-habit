import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';

export default function PublicLayout() {
  const userState = useRecoilValue(userAtom);

  if (
    userState.isLogged &&
    userState.provider === 'kakao' &&
    userState.name === '' &&
    userState.age === 0 &&
    userState.gender === ''
  ) {
    return <Navigate to="/register/kakao" />;
  }

  return userState.isLogged ? <Navigate to="/" /> : <Outlet />;
}
