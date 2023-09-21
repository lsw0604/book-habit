import { IconPalette } from '@style/icons';
import HeaderPaletteDropdown from 'components/Palette';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.3rem 0.1rem 0.3rem;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.main};
`;

const CircleBtn = styled.button`
  width: 4rem;
  height: 2.5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.spinner};
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 1.3rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function BottomNavigationPaletteButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handlePaletteOutside = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePaletteOutside);
    return () => {
      document.removeEventListener('mousedown', handlePaletteOutside);
    };
  }, [isOpen]);

  return (
    <Container ref={paletteRef}>
      {isOpen && <HeaderPaletteDropdown />}
      <CircleBtn onClick={handleOpen}>
        <IconPalette />
      </CircleBtn>
    </Container>
  );
}
