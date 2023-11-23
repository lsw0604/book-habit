import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import GuardLayout from './GuardLayout';
import { useLocation } from 'react-router-dom';

/**
 * TODO: kakao OAuth 로그인을 했지만 age, name, gender 정보가 없는경우 /register/kakao로 보내야함
 * @param needKakaoRegister boolean: 카카오 회원가입이 필요한지 아닌지를 묻는 경우
 */
export default function IsKakaoAuthLayout({
  needKakaoRegister,
}: {
  needKakaoRegister: boolean;
}) {
  const userState = useRecoilValue(userAtom);
  const { isLogged, provider, age, name, gender } = userState;
  const { pathname } = useLocation();

  let isRouteAccessible;
  let redirectUrl;

  if (needKakaoRegister) {
    isRouteAccessible =
      isLogged &&
      provider === 'kakao' &&
      (age === null || name === null || gender === null);
    redirectUrl = pathname === '/register/kakao' ? '/search' : pathname;
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
