import { useDynamicIcon } from '@hooks/useDynamicIcon';
import { useColor } from '@hooks/useColor';
import styled from 'styled-components';
import { ColorNumType, ColorType, IconType, SizeType } from 'types/style';
import { size as Icon } from './size';

interface ContainerProps {
  size: SizeType;
  color?: ColorType;
  colorNum?: ColorNumType;
  marginRight?: number;
}

const Container = styled.div<ContainerProps>`
  margin: 0;
  width: ${({ size }) => Icon[size].width}px;
  height: ${({ size }) => Icon[size].height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ marginRight }) => marginRight}px;
  #svg {
    fill: ${({ color, colorNum }) =>
      color && colorNum
        ? useColor(color, colorNum)
        : ({ theme }) => theme.mode.typo_main};
  }
`;

interface IProps {
  icon: IconType;
  size: SizeType;
  color?: ColorType;
  colorNum?: ColorNumType;
  marginRight?: number;
}

const Index: React.FC<IProps> = ({
  icon,
  colorNum,
  color,
  size,
  marginRight,
}) => {
  const { loading, svg: SvgComponent } = useDynamicIcon(icon);

  return (
    <Container size={size} color={color} colorNum={colorNum}>
      {!loading && SvgComponent && <SvgComponent id="svg" />}
    </Container>
  );
};

export default Index;
