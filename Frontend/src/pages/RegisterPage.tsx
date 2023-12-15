import styled from 'styled-components';
import Register from 'components/user/Register';
import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  box-sizing: border-box;
  overflow: scroll;
`;

export default function RegisterPage() {
  return (
    <HelmetProvider title="회원가입" description="회원가입하는 페이지입니다.">
      <Container>
        <Register />
      </Container>
    </HelmetProvider>
  );
}
