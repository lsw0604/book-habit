import { useRecoilValue } from 'recoil';

import GuardLayout from './GuardLayout';
import { userAtom } from 'recoil/user';
import { useLocation } from 'react-router-dom';

interface IProps {
  needLogin: boolean;
}
/**
 * TODO: 로그인 상태 url에 직접 needLogin true로 감싸진 주소를 입력하면 userState가 초기화된 뒤 AccessHook으로 부터 받아온 userState 때문에 로그인 상태에서 직접 주소로 이동하는건 불가능한 듯한데 이걸 해결할 방법이 있을까?
 */
export default function IsAuthLayout({ needLogin }: IProps) {
  const userState = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  return needLogin ? (
    <GuardLayout
      isRouteAccessible={userState.isLogged}
      redirectUrl={userState.isLogged ? pathname : '/search'}
    />
  ) : (
    <GuardLayout
      isRouteAccessible={!userState.isLogged}
      redirectUrl="/search"
    />
  );
}
