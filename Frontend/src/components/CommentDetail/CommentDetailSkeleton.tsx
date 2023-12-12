import styled from 'styled-components';
import Loader from 'components/common/Loader';

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CommentDetailSkeleton() {
  return (
    <Container>
      <Loader size={2} />
    </Container>
  );
}
