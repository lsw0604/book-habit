import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';

const Container = styled.div`
  display: inline-flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: auto;
`;

export default function HeaderAuth() {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <Button onClick={() => navigate('/register')}>회원가입</Button>
      </Wrapper>
      <Wrapper>
        <Button onClick={() => navigate('/login')}>로그인</Button>
      </Wrapper>
    </Container>
  );
}
