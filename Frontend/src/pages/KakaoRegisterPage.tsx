import styled from 'styled-components';
import KakaoRegisterForm from 'components/user/KakaoRegisterForm';
import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 375px;
  width: 100%;
  height: 100%;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1280px) {
    max-width: 500px;
    border-radius: 10px;
  }
`;

export default function KakaoRegisterPage() {
  return (
    <HelmetProvider
      title="내 정보등록하기"
      description="카카오로 로그인 후 사용자 정보를 등록하는 페이지입니다."
    >
      <Container>
        <KakaoRegisterForm />
      </Container>
    </HelmetProvider>
  );
}
