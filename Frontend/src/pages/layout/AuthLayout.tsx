import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';

export default function AuthLayout() {
  const userState = useRecoilValue(userAtom);

  return userState.isLogged ? <Outlet /> : <Navigate to="/login" />;
}
