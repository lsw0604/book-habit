import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { IconCloudyParty, IconPalette, IconSunny } from '@style/icons';
import Icon from 'components/common/Button/Icon';
import HeaderAuth from './HeaderAuth';
import StarRating from 'components/StarRating/Rating';
import useStarHook from '@hooks/useStarHook';
import HeaderPalette from './HeaderPalette';
import Toggle from '../../components/common/Toggle.tsx';
import useTheme from '@hooks/useTheme';
import useOutsideClick from '@hooks/useOutsideClick';

interface IProps {
  onToggle?: () => void;
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

export default function Index({ onToggle }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const paletteRef = useRef<HTMLDivElement>(null);
  const { setHovering, setStar, star, hovering } = useStarHook();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      paletteRef.current &&
      !paletteRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header>
      <Container ref={paletteRef}>
        {isOpen && (
          <div
            style={{
              marginTop: '100px',
              width: '100px',
              height: '100px',
              background: 'black',
              zIndex: '1111px',
            }}
          >
            Open
          </div>
        )}
        <Logo onClick={() => navigate('/')}>Logo</Logo>
        <StarRating
          isClicked={star}
          isHovering={hovering}
          setIsClicked={setStar}
          setIsHovering={setHovering}
        />
        <HeaderPalette />
        <HeaderAuth />
      </Container>
    </header>
  );
}
