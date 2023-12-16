import styled from 'styled-components';
import { Navigate, useParams } from 'react-router-dom';

import CommentDetailReplyList from 'components/CommentDetail/CommentDetailReplyList';
import CommentDetailReplyForm from 'components/CommentDetail/CommentDetailReplyForm';
import CommentDetail from 'components/CommentDetail/CommentDetail';
import HelmetProvider from 'components/common/HelmetProvider';

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

  const COMMENT_ID = parseInt(comment_id);

  return (
    <HelmetProvider
      title="댓글"
      description="한줄평에 달린 댓글을 보는 페이지입니다."
    >
      <Container>
        <CommentDetail comment_id={COMMENT_ID} />
        <ReplyContainer>
          <Wrapper>
            <CommentDetailReplyList comment_id={COMMENT_ID} />
          </Wrapper>
          <CommentDetailReplyForm comment_id={COMMENT_ID} />
        </ReplyContainer>
      </Container>
    </HelmetProvider>
  );
}
