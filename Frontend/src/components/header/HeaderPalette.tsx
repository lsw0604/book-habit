import Icon from 'components/common/Button/Icon';
import styled from 'styled-components';
import { IconPalette } from '@style/icons';
import { useEffect, useRef, useState } from 'react';
import HeaderPaletteDropdown from './HeaderPaletteDropdown';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

export default function HeaderPalette() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const paletteRef = useRef<HTMLDivElement>(null);

  const handlePalette = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    const handlePaletteOutside = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

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
        {isOpened && <HeaderPaletteDropdown />}
      </Container>
    </>
  );
}
