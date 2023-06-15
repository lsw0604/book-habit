import { memo } from 'react';
import styled from 'styled-components';
import { size } from './size';
import { IconType, SizeType } from 'types/style';
import Icon from '../Icon';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  size: SizeType;
}

interface ContainerProps {
  size: SizeType;
}

const Container = styled.button<ContainerProps>`
  margin: 0;
  padding: 0;
  cursor: pointer;
  ${(props) => size[props.size]}
  align-items: center;
  border: 0px solid;
  z-index: 999;
  display: flex;
  background-color: white;
`;

const CircleButton = styled.div`
  padding: 2px;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 45%;
  border-radius: 100%;
  background-color: black;
`;

const Toggle: React.FC<IProps> = ({ size, icon, ...props }) => {
  return (
    <Container size={size} {...props}>
      <CircleButton>
        <Icon
          icon="Beach"
          width={100}
          height={100}
          color="cyan"
          colorNum="200"
        />
      </CircleButton>
    </Container>
  );
};

const Index = memo(Toggle);

export default Index;
