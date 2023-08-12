import { customize } from '@style/colors';
import { IconKakao } from '@style/icons';
import Button from 'components/common/Button';

export default function Kakao() {
  const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onWindowOpen = () => {
    window.open(url, '_self');
  };

  return (
    <Button
      style={{ backgroundColor: customize.yellow['300'] }}
      type="button"
      onClick={onWindowOpen}
      icon={<IconKakao />}
    >
      카카오로 로그인하기
    </Button>
  );
}
