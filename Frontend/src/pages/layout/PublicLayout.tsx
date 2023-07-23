import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';

export default function PublicLayout() {
  const userState = useRecoilValue(userAtom);

  return userState.id ? <Navigate to="/" /> : <Outlet />;
}
