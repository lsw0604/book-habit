import styled from 'styled-components';
import Loader from 'components/common/Loader';

interface IProps {
  isLoading?: boolean;
  height?: string;
  message?: string;
}

const Container = styled.div<{ height?: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  height: ${({ height }) => (height ? height : 'auto')};
`;

const Message = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 12px;
  line-height: 16px;
`;

export default function CommentDetailSkeleton({
  isLoading,
  height,
  message,
}: IProps) {
  return (
    <Container height={height}>
      {isLoading && <Loader size={2} />}
      <Message>{message}</Message>
    </Container>
  );
}
