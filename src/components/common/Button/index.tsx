import { memo } from 'react';
import styled, { css } from 'styled-components';
import Icon from '../Icon';
import {
  ColorModeType,
  ColorNumType,
  ColorType,
  IconType,
  SizeType,
} from 'types/style';
import { useColor } from '@hooks/useColor';
import { useButtonMode } from '@hooks/useButtonMode';

interface IContainerProps {
  icon: boolean;
  size: SizeType;
  color?: ColorType;
  colorNum?: ColorNumType;
  colorMode?: ColorModeType;
}

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: IconType;
  size?: SizeType;
  color?: ColorType;
  colorNum?: ColorNumType;
  colorMode?: ColorModeType;
}
const { getSizeNormalButton } = useButtonMode();

const Container = styled.button<IContainerProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: ${({ icon }) => (icon ? '0 20px' : '0px 15px')};
  border: 0;
  border-radius: 5px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  color: ${(props) =>
    props.color && props.colorNum
      ? useColor(props.color, props.colorNum)
      : ({ theme }) => theme.mode.typo_main};
  ${({ size }) => getSizeNormalButton(size)};
  background-color: ${({ theme }) => theme.mode.bg_main};
`;

const Index: React.FC<IProps> = ({
  size = 'md',
  color,
  colorMode = 'fill',
  colorNum = '500',
  children,
  icon,
  ...props
}) => {
  return (
    <Container
      icon={!!icon}
      size={size}
      color={color}
      colorNum={colorNum}
      colorMode={colorMode}
      {...props}
    >
      {icon && (
        <Icon size={size} color={color} colorNum={colorNum} icon={icon} />
      )}
      {children}
    </Container>
  );
};

const Button = memo(Index);

export default Button;
