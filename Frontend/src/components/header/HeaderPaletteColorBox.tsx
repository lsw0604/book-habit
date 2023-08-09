import useThemeHook from '@hooks/useThemeHook';
import { customize } from '@style/colors';
import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { colorAtom } from 'recoil/theme';
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

export default function HeaderPaletteColorBox() {
  const [color, setColor] = useRecoilState(colorAtom);
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
  const { colorHandler } = useThemeHook();

  const handleColors = useCallback(
    (color: ColorType) => {
      setColor(color);
      colorHandler(color);
      setColors((prev) => {
        if (!prev.includes(color)) {
          return [...prev, color];
        }
        return prev;
      });
    },
    [color, setColor]
  );

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
