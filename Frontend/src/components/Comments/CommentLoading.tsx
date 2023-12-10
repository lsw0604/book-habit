import Loader from 'components/common/Loader';
import styled from 'styled-components';

interface IProps {
  isLoading: boolean;
}

const Container = styled.div<{ isLoading: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isLoading }) => (isLoading ? '100%' : null)};
`;

export default function CommentLoading({ isLoading }: IProps) {
  return (
    <Container isLoading={isLoading}>
      <Loader size={2} />
    </Container>
  );
}
