import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import { IconBeach } from '@style/icons';

interface IProps {
  onToggle: () => void;
}

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

const Logo = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const AuthGroup = styled.div``;

export default function Index({ onToggle }: IProps) {
  const navigate = useNavigate();

  return (
    <header>
      <Container>
        <Logo onClick={() => navigate('/')}>Logo</Logo>
        <AuthGroup>
          <Button onClick={onToggle} icon={<IconBeach />}>
            ss
          </Button>
          <Button icon={<IconBeach />}>ss</Button>
        </AuthGroup>
      </Container>
    </header>
  );
}
