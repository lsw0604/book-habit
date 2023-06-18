import { memo } from 'react';
import styled, { css } from 'styled-components';
import Icon from '../Icon';
import { ColorNumType, ColorType, IconType, SizeType } from 'types/style';
import { useColor } from '@hooks/useColor';
import { useButtonMode } from '@hooks/useButtonMode';

const { getSizeNormalButton } = useButtonMode();

interface IContainerProps {
  icon: boolean;
  size: SizeType;
  color?: ColorType;
  colorNum?: ColorNumType;
}

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: IconType;
  size: SizeType;
  color?: ColorType;
  colorNum?: ColorNumType;
}

const Container = styled.button<IContainerProps>`
  display: flex;
  justify-content: center;
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
  size,
  color,
  colorNum,
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
      {...props}
    >
      {icon && (
        <Icon
          size={size}
          color={color}
          colorNum={colorNum}
          icon={icon}
          marginRight={10}
        />
      )}
      {children}
    </Container>
  );
};

const Button = memo(Index);

export default Button;
