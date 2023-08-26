import { useRecoilValue } from 'recoil';
import GuardLayout from './GuardLayout';

import { userAtom } from 'recoil/user';

export default function IsAuthLayout() {
  const userState = useRecoilValue(userAtom);

  return (
    <GuardLayout isRouteAccessible={!userState.isLogged} redirectUrl="/" />
  );
}
