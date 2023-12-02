import styled from 'styled-components';
import Login from 'components/user/Login';
import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HELMET_PROVIDER_OPTIONS = {
  title: '로그인',
  description: '책벌래의 로그인 관리하는 페이지입니다.',
};

export default function LoginPage() {
  return (
    <>
      <HelmetProvider {...HELMET_PROVIDER_OPTIONS} />
      <Container>
        <Login />
      </Container>
    </>
  );
}
