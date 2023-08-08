import styled from 'styled-components';
import Register from 'components/user/Register';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const RegisterFormWrapper = styled.div``;

export default function RegisterPage() {
  return (
    <Container>
      <RegisterFormWrapper>
        <Register />
      </RegisterFormWrapper>
    </Container>
  );
}
