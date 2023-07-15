import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import HeaderAuth from './HeaderAuth';
import HeaderPalette from './HeaderPalette';
import { ColorType } from 'types/style';

interface IProps {
  onToggle: () => void;
  isOn: boolean;
  selectedColor: ColorType;
  colorHandler: (color: ColorType) => void;
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

export default function Index({
  onToggle,
  isOn,
  selectedColor,
  colorHandler,
}: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const paletteRef = useRef<HTMLDivElement>(null);

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
        <div style={{ display: 'inline-flex', gap: '10px' }}>
          <HeaderPalette
            onToggle={onToggle}
            isOn={isOn}
            selectedColor={selectedColor}
            colorHandler={colorHandler}
          />
          <HeaderAuth />
        </div>
      </Container>
    </header>
  );
}
