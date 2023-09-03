import { useRecoilValue } from 'recoil';

import GuardLayout from './GuardLayout';
import { userAtom } from 'recoil/user';

interface IProps {
  isAuth: boolean;
}

export default function IsAuthLayout({ isAuth }: IProps) {
  const userState = useRecoilValue(userAtom);

  return isAuth ? (
    <GuardLayout isRouteAccessible={userState.isLogged} redirectUrl="/" />
  ) : (
    <GuardLayout isRouteAccessible={!userState.isLogged} redirectUrl="/" />
  );
}
