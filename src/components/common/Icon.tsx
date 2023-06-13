import styled from 'styled-components';

interface ContainerProps {
  width: number;
  height: number;
}

const Container = styled.div<ContainerProps>`
  margin: 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

interface IProps {
  icon: JSX.Element;
  width: number;
  height: number;
}

const Icon: React.FC<IProps> = ({ icon, width, height }) => {
  return (
    <Container width={width} height={height}>
      {icon}
    </Container>
  );
};

export default Icon;
