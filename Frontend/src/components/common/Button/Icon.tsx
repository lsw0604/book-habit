import { memo, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { IconType, SizeType } from 'types/style';
import Icon from '../Icon';
import { icon } from './size';

const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  width: ${({ size }) => icon[size].width}px;
  height: ${({ size }) => icon[size].height}px;
  background-color: ${({ theme }) => theme.mode.bg_main};
  color: ${({ theme }) => theme.mode.typo_main};
`;

interface ContainerProps {
  size: SizeType;
}

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: SizeType;
  icon: IconType;
}

const Index: React.FC<IProps> = ({ icon, size, ...props }) => {
  return (
    <Container size={size} {...props}>
      <Icon size={size} icon={icon} />
    </Container>
  );
};

const IconButton = memo(Index);

export default IconButton;
