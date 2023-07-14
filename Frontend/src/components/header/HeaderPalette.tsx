import Icon from 'components/common/Button/Icon';
import styled from 'styled-components';
import { IconPalette } from '@style/icons';
import { useEffect, useRef, useState } from 'react';
import { customize } from '@style/colors';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

const PaletteMenu = styled.ul`
  position: absolute;
  inset: 0px auto auto 0px;
  height: auto;
  padding: 0.5rem;
  background-color: black;
`;

export default function HeaderPalette() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const paletteRef = useRef<HTMLDivElement>(null);

  const handlePalette = () => {
    setIsOpened((prev) => !prev);
  };

  const handlePaletteOutside = (event: MouseEvent) => {
    if (
      paletteRef.current &&
      !paletteRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handlePaletteOutside);
    return () => {
      document.removeEventListener('mousedown', handlePaletteOutside);
    };
  }, [isOpened]);

  return (
    <>
      <Container ref={paletteRef}>
        <Icon icon={<IconPalette />} onClick={handlePalette}>
          Palette Settings
        </Icon>
        {isOpened && (
          <PaletteDropdownContainer>
            <li>
              <PaletteMenu></PaletteMenu>
            </li>
          </PaletteDropdownContainer>
        )}
      </Container>
    </>
  );
}

const PaletteDropdownMenu = styled.div`
  display: none;
  width: 100%;
`;

const PaletteDropdownContainer = styled.ul`
  display: flex;
  padding: 1rem;
  margin-top: 1rem;
  flex-direction: column;
  border-width: 1px;
  border-color: ${customize.gray['100']};
  border-radius: 0.5rem;
  background-color: ${customize.gray['50']};
`;

const PaletteDropdownButton = styled.a`
  display: block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 0.75rem;
  color: ${({ theme }) => theme.mode.typo_main};
  background-color: ${({ theme }) => theme.mode.main};
  border-radius: 0.25rem;
`;

const PaletteDropdownNavbar = styled.div`
  z-index: 10rem;
  display: none;
  background-color: ${({ theme }) => theme.mode.main};
  color: ${({ theme }) => theme.mode.typo_main};
`;
