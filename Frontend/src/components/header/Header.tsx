import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import useDarkMode from '@hooks/useTheme';

const Container = styled.nav`
  position: fixed;
  top: 0;
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.mode.main};
  padding: 0 4rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div``;

const AuthGroup = styled.div`
  display: flex;
`;

export default function index() {
  const navigate = useNavigate();
  const { toggleTheme } = useDarkMode();

  const onHomeHandler = () => {
    navigate('/');
  };

  return (
    <header>
      <Container>
        <Logo onClick={onHomeHandler}>Logo</Logo>
        <AuthGroup>
          <Button onClick={toggleTheme}>ss</Button>
          <Button>s</Button>
        </AuthGroup>
      </Container>
    </header>
  );
}
