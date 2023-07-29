import styled from 'styled-components';
import Login from 'components/user/Login';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export default function LoginPage() {
  return (
    <Container>
      <Login />
    </Container>
  );
}
