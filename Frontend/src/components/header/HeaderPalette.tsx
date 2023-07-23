import Icon from 'components/common/Button/Icon';
import styled from 'styled-components';
import { IconPalette } from '@style/icons';
import { useEffect, useRef, useState } from 'react';
import { ColorType } from 'types/style';
import HeaderPaletteDropdown from './HeaderPaletteDropdown';

interface IProps {
  onToggle: () => void;
  isOn: boolean;
  selectedColor: ColorType;
  colorHandler: (color: ColorType) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

export default function HeaderPalette({
  onToggle,
  isOn,
  selectedColor,
  colorHandler,
}: IProps) {
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
        {isOpened && (
          <HeaderPaletteDropdown
            isOn={isOn}
            colorHandler={colorHandler}
            selectedColor={selectedColor}
            onToggle={onToggle}
          />
        )}
      </Container>
    </>
  );
}
