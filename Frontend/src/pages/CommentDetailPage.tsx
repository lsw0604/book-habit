import styled from 'styled-components';
import { Navigate, useParams } from 'react-router-dom';

import CommentReplyList from 'components/CommentDetail/CommentReplyList';
import CommentReplyForm from 'components/CommentDetail/CommentReplyForm';
import CommentDetail from 'components/CommentDetail/CommentDetail';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 1rem;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
`;

const ReplyContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border-radius: 1rem;
`;

const Wrapper = styled.div`
  height: 80%;
  position: relative;
  width: 100%;
  overflow: scroll;
  margin-bottom: 1rem;
`;

export default function CommentDetailPage() {
  const { comment_id } = useParams();

  if (!comment_id) return <Navigate to="/404" />;

  return (
    <Container>
      <CommentDetail comment_id={comment_id} />
      <ReplyContainer>
        <Wrapper>
          <CommentReplyList />
        </Wrapper>
        <CommentReplyForm comment_id={comment_id} />
      </ReplyContainer>
    </Container>
  );
}
