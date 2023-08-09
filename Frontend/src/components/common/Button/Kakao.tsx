import Button from 'components/common/Button';

export default function Kakao() {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_REST_API
  }&redirect_uri=http://localhost:5173/login/kakao&response_type=code`;

  const onWindowOpen = () => {
    window.open(url, '_self');
  };

  return (
    <>
      <Button type="button" onClick={onWindowOpen}>
        카카오
      </Button>
    </>
  );
}
