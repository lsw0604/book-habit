import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import GuardLayout from './GuardLayout';
import { useLocation } from 'react-router-dom';

export default function IsKakaoAuthLayout({
  isKakaoRegister,
}: {
  isKakaoRegister: boolean;
}) {
  const userState = useRecoilValue(userAtom);
  const { isLogged, provider, age, name, gender } = userState;
  const { pathname } = useLocation();

  let isRouteAccessible;
  let redirectUrl;

  if (isKakaoRegister) {
    isRouteAccessible =
      isLogged &&
      provider === 'kakao' &&
      (age === null || name === null || gender === null);
    redirectUrl = pathname;
  } else {
    isRouteAccessible = !(
      isLogged &&
      provider === 'kakao' &&
      (age === null || name === null || gender === null)
    );
    redirectUrl = '/register/kakao';
  }

  return (
    <GuardLayout
      isRouteAccessible={isRouteAccessible}
      redirectUrl={redirectUrl}
    />
  );
}
