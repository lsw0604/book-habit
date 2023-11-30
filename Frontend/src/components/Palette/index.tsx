import styled, { css } from 'styled-components';

import Toggle from 'components/common/Toggle';
import HeaderPaletteColorBox from 'components/Palette/ColorBox';
import { ColorType } from 'types/style';
import { customize } from '@style/colors';
import { IconCloudyParty, IconSunny } from '@style/icons';
import useThemeHook from '@hooks/useThemeHook';

const ThemeCSS = css`
  margin-bottom: 10px;
`;

const ColorCSS = css`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  position: absolute;
  bottom: 5rem;
  z-index: 9999;
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

const Li = styled.li<{ mode: 'theme' | 'color' }>`
  border-radius: 0.5rem;
  padding: 10px;
  width: 100%;
  height: auto;
  color: ${({ theme }) => theme.mode.typo_sub};
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  ${({ mode }) => mode === 'theme' && ThemeCSS}
  ${({ mode }) => mode === 'color' && ColorCSS}
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
  background-color: ${({ btnColor }) => customize[btnColor]['400']};
  border: 0;
  justify-content: center;
  align-items: center;
`;

const ICONS = [
  <IconSunny key="sunny" style={{ fill: customize.yellow['300'] }} />,
  <IconCloudyParty key="cloudy" style={{ fill: customize.yellow['300'] }} />,
];

export default function Index() {
  const { isOn, toggleHandler, color } = useThemeHook();

  return (
    <Container>
      <Ul>
        <Li mode="theme">
          <Label>
            <span>테마</span>
            <Toggle isOn={isOn} toggleHandler={toggleHandler} icons={ICONS} />
          </Label>
        </Li>
        <Li mode="color">
          <Label>
            <span>색상</span>
            <ColorButton btnColor={color} />
          </Label>
          <HeaderPaletteColorBox />
        </Li>
      </Ul>
    </Container>
  );
}
