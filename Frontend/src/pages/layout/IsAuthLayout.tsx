import { useRecoilValue } from 'recoil';

import GuardLayout from './GuardLayout';
import { userAtom } from 'recoil/user';
import { useLocation } from 'react-router-dom';

interface IProps {
  isAuth: boolean;
}

export default function IsAuthLayout({ isAuth }: IProps) {
  const userState = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  return isAuth ? (
    <GuardLayout
      isRouteAccessible={userState.isLogged}
      redirectUrl={pathname}
    />
  ) : (
    <GuardLayout isRouteAccessible={!userState.isLogged} redirectUrl="/home" />
  );
}
