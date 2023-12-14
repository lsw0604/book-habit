import styled from 'styled-components';
import Register from 'components/user/Register';

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
    <Container>
      <Register />
    </Container>
  );
}
