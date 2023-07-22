import { customize } from '@style/colors';
import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { ColorType } from 'types/style';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
`;

const ColorButtonsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ColorButton = styled.button<{
  btnColor: ColorType;
}>`
  width: 1.5rem;
  height: 1.5rem;
  outline: 0;
  border-radius: 50%;
  margin: 3px;
  background-color: ${(props) => customize[`${props.btnColor}`][400]};
  border: 0;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  colorHandler: (color: ColorType) => void;
  selectedColor: ColorType;
}

export default function HeaderPaletteColorBox({
  colorHandler,
  selectedColor,
}: IProps) {
  const [colors, setColors] = useState<ColorType[]>([
    'lime',
    'rose',
    'sky',
    'teal',
    'yellow',
    'fuchsia',
    'orange',
    'gray',
  ]);

  const handleColors = useCallback(
    (color: ColorType) => {
      colorHandler(color);
      setColors((prev) => {
        if (!prev.includes(selectedColor)) {
          return [...prev, selectedColor];
        }
        return prev;
      });
    },
    [colorHandler, selectedColor]
  );

  useEffect(() => {
    setColors((prev) => prev.filter((color) => color !== selectedColor));
  }, [selectedColor]);

  return (
    <Container>
      <ColorButtonsList>
        {colors.map((color) => (
          <ColorButton
            key={color}
            type="button"
            btnColor={color}
            onClick={() => handleColors(color)}
          />
        ))}
      </ColorButtonsList>
    </Container>
  );
}