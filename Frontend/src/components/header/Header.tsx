import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { IconPalette } from '@style/icons';
import Icon from 'components/common/Button/Icon';
import HeaderAuth from './HeaderAuth';
import StarRating from 'components/StarRating/Rating';
import useStarHook from '@hooks/useStarHook';

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

const AuthGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

export default function Index({ onToggle }: IProps) {
  const navigate = useNavigate();
  const { setHovering, setStar, star, hovering } = useStarHook();

  return (
    <header>
      <Container>
        <Logo onClick={() => navigate('/')}>Logo</Logo>
        <StarRating
          isClicked={star}
          isHovering={hovering}
          setIsClicked={setStar}
          setIsHovering={setHovering}
        />
        <Icon icon={<IconPalette />} onClick={onToggle}>
          Theme Setting
        </Icon>
        <HeaderAuth />
      </Container>
    </header>
  );
}
