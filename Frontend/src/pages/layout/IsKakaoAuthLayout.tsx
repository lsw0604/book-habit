import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import GuardLayout from './GuardLayout';

export default function IsKakaoAuthLayout({
  isKakaoRegister,
}: {
  isKakaoRegister: boolean;
}) {
  const userState = useRecoilValue(userAtom);
  const { isLogged, provider, age, name, gender } = userState;

  let isRouteAccessible;
  let redirectUrl;

  if (isKakaoRegister) {
    isRouteAccessible =
      isLogged &&
      provider === 'kakao' &&
      (age === null || name === null || gender === null);
    redirectUrl = '/';
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
