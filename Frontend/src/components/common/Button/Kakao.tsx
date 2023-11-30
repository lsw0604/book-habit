import { customize } from '@style/colors';
import { IconKakao } from '@style/icons';
import Button from 'components/common/Button';

const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function Kakao() {
  const kakaoPageHandler = () => {
    window.location.href = URL;
  };

  return (
    <Button
      style={{ backgroundColor: customize.yellow['300'] }}
      type="button"
      onClick={kakaoPageHandler}
      icon={<IconKakao />}
    >
      카카오로 로그인하기
    </Button>
  );
}
