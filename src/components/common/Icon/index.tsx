import { useDynamicIcon } from '@hooks/useDynamicIcon';
import { useColor } from '@hooks/useColor';
import styled from 'styled-components';
import { ColorNumType, ColorType, IconType, SizeType } from 'types/style';
import { size as Icon } from './size';

interface ContainerProps {
  size: SizeType;
  color?: ColorType;
  colorNum?: ColorNumType;
}

const Container = styled.div<ContainerProps>`
  margin: 0;
  width: ${(props) => Icon[props.size].width}px;
  height: ${(props) => Icon[props.size].height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  #svg {
    fill: ${(props) =>
      props.color && props.colorNum
        ? useColor(props.color, props.colorNum)
        : ({ theme }) => theme.mode.typo_main};
  }
`;

interface IProps {
  icon: IconType;
  size: SizeType;
  color?: ColorType;
  colorNum?: ColorNumType;
}

const Index: React.FC<IProps> = ({ icon, colorNum, color, size }) => {
  const { loading, svg: SvgComponent } = useDynamicIcon(icon);

  return (
    <Container size={size} color={color} colorNum={colorNum}>
      {!loading && SvgComponent && <SvgComponent id="svg" />}
    </Container>
  );
};

export default Index;
