import Loader from 'components/common/Loader';
import styled from 'styled-components';

interface IProps {
  height?: string;
}

const Container = styled.div<{ height?: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => (height ? height : null)};
`;

export default function CommentLoading({ height }: IProps) {
  return (
    <Container height={height}>
      <Loader size={2} />
    </Container>
  );
}
