import styled from 'styled-components';
import KakaoRegister from 'components/user/KakaoRegister';
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

const HELMET_PROVIDER_OPTIONS = {
  title: '유저 정보 등록',
  description: '유저 정보를 등록하는 페이지를 보여줍니다.',
};

export default function KakaoRegisterPage() {
  return (
    <>
      <HelmetProvider {...HELMET_PROVIDER_OPTIONS} />
      <Container>
        <KakaoRegister />
      </Container>
    </>
  );
}
