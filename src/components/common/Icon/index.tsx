import { useDynamicIcon } from '@hooks/useDynamicIcon';
import { useColor } from '@hooks/useColor';
import styled from 'styled-components';
import { ColorNumType, ColorType, IconType } from 'types/style';

interface ContainerProps {
  width: number;
  height: number;
  color: ColorType;
  colorNum: ColorNumType;
}

const Container = styled.div<ContainerProps>`
  margin: 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  #svg {
    fill: ${(props) => useColor(props.color, props.colorNum)};
  }
`;

interface IProps {
  icon: IconType;
  width: number;
  height: number;
  color: ColorType;
  colorNum: ColorNumType;
}

const Index: React.FC<IProps> = ({ icon, width, height, colorNum, color }) => {
  const { loading, svg: SvgComponent } = useDynamicIcon(icon);

  return (
    <Container width={width} height={height} color={color} colorNum={colorNum}>
      {!loading && SvgComponent && <SvgComponent id="svg" />}
    </Container>
  );
};

export default Index;
