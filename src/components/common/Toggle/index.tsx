import { memo, ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { size } from './size';
import { IconType, SizeType, ToggleIconTupleType } from 'types/style';
import Icon from '../Icon';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ToggleIconTupleType<IconType, 2>;
  size: SizeType;
  ToggleSwitch?: boolean;
}

interface ContainerProps {
  size: SizeType;
}

interface CircleProps {
  ToggleSwitch?: boolean;
}

const getToggleButtonSize = (ctx: SizeType) => css`
  height: ${size[ctx].height}px;
  width: ${size[ctx].width}px;
  border-radius: ${size[ctx]['border-radius']}px;
`;

const Container = styled.button<ContainerProps>`
  margin: 0;
  padding: 0;
  cursor: pointer;
  align-items: center;
  z-index: 999;
  display: flex;
  ${(props) => getToggleButtonSize(props.size)};
  box-shadow: ${({ theme }) => theme.shadow.xl};
  border: 0px solid ${({ theme }) => theme.mode.bg_main};
  background-color: ${({ theme }) => theme.mode.bg_toggle};
`;

const CircleButton = styled.div<CircleProps>`
  padding: 2px;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 45%;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.mode.bg_main};
  right: ${(props) => (props.ToggleSwitch ? '-1.6px' : '-33.6px')};
  transition: right 0.3s linear;
`;

const Toggle: React.FC<IProps> = ({ ToggleSwitch, size, icon, ...props }) => {
  return (
    <Container size={size} {...props}>
      <CircleButton ToggleSwitch={ToggleSwitch}>
        {ToggleSwitch ? (
          <Icon icon={icon[0]} size={size} color="yellow" colorNum="400" />
        ) : (
          <Icon icon={icon[1]} size={size} color="yellow" colorNum="400" />
        )}
      </CircleButton>
    </Container>
  );
};

const Index = memo(Toggle);

export default Index;
