import styled from 'styled-components';
import { Navigate, useParams } from 'react-router-dom';

import CommentDetailReplyList from 'components/comment-detail/comment-detail-reply-list';
import CommentDetailReplyForm from 'components/comment-detail/comment-detail-reply-form';
import CommentDetail from 'components/comment-detail/comment-detail';
import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: auto;
  box-sizing: border-box;
`;

const ReplyContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
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
          <CommentDetailReplyList comment_id={COMMENT_ID} />
          <CommentDetailReplyForm comment_id={COMMENT_ID} />
        </ReplyContainer>
      </Container>
    </HelmetProvider>
  );
}
