import styled from 'styled-components';

import Toggle from 'components/common/Toggle';
import HeaderPaletteColorBox from './HeaderPaletteColorBox';
import { ColorType } from 'types/style';
import { customize } from '@style/colors';
import { IconCloudyParty, IconSunny } from '@style/icons';

interface IProps {
  onToggle: () => void;
  isOn: boolean;
  selectedColor: ColorType;
  colorHandler: (color: ColorType) => void;
}

const Container = styled.div`
  position: absolute;
  z-index: 9999;
  top: 3.5rem;
  display: flex;
  padding: 0.1rem;
  margin-top: 0.8rem;
  flex-direction: column;
  width: 10rem;
  height: auto;
  border-width: 1px;
  border-color: ${customize.gray['100']};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mode.main};
  box-shadow: ${({ theme }) => theme.shadow.xl};
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const Li = styled.li`
  border-radius: 0.5rem;
  padding: 10px;
  width: 100%;
  height: auto;
  color: ${({ theme }) => theme.mode.typo_sub};
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const ColorButton = styled.div<{ btnColor: ColorType }>`
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

export default function HeaderPaletteDropdown({
  colorHandler,
  isOn,
  onToggle,
  selectedColor,
}: IProps) {
  return (
    <Container>
      <Ul>
        <Li style={{ marginBottom: '10px' }}>
          <Label>
            <span>테마</span>
            <Toggle
              isOn={isOn}
              setIsOn={onToggle}
              icons={[
                <IconSunny
                  key="sunny"
                  style={{ fill: customize.yellow['300'] }}
                />,
                <IconCloudyParty
                  key="cloudy"
                  style={{ fill: customize.yellow['300'] }}
                />,
              ]}
            />
          </Label>
        </Li>
        <Li style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>
            <span>색상</span>
            <ColorButton btnColor={selectedColor} />
          </Label>
          <HeaderPaletteColorBox
            selectedColor={selectedColor}
            colorHandler={colorHandler}
          />
        </Li>
      </Ul>
    </Container>
  );
}
