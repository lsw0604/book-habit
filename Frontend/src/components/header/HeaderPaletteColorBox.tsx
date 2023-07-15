import { customize } from '@style/colors';
import { IconPencil, IconSuccess, IconX } from '@style/icons';
import { useState, useCallback, MouseEvent } from 'react';
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
`;

const colors: ColorType[] = [
  'cyan',
  'gray',
  'lime',
  'rose',
  'sky',
  'teal',
  'yellow',
  'fuchsia',
  'orange',
];

interface IProps {
  selectedColor: ColorType;
  colorHandler: (color: ColorType) => void;
}

export default function HeaderPaletteColorBox({
  selectedColor,
  colorHandler,
}: IProps) {
  return (
    <Container>
      <ColorButtonsList>
        {colors.map((color) => (
          <ColorButton
            key={color}
            type="button"
            btnColor={color}
            onClick={() => colorHandler(color)}
          >
            {selectedColor === color && <IconX />}
          </ColorButton>
        ))}
      </ColorButtonsList>
    </Container>
  );
}
