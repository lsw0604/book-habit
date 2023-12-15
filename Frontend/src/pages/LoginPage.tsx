import styled from 'styled-components';

import HelmetProvider from 'components/common/HelmetProvider';
import LoginForm from 'components/user/LoginForm';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoginPage() {
  return (
    <HelmetProvider title="로그인" description="로그인 페이지입니다.">
      <Container>
        <LoginForm />
      </Container>
    </HelmetProvider>
  );
}
