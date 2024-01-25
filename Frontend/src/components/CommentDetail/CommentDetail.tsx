import styled from 'styled-components';

import CommentsHeader from 'components/comments/CommentsHeader';
import CommentDetailSkeleton from 'components/CommentDetail/CommentDetailSkeleton';
import useCommentsDetailQuery from '@queries/comments/useCommentsDetailQuery';
import CommentsHeart from 'components/comments/CommentsHeart';
import CommentsReply from 'components/comments/CommentsReply';
import CommentsBody from 'components/comments/CommentsBody';

interface IProps {
  comment_id: number;
}

const Container = styled.div`
  gap: 1rem;
  width: 100%;
  height: auto;
  padding: 1rem;
  display: flex;
  position: relative;
  border-radius: 1rem;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: start;
  gap: 1rem;
  svg {
    width: 1rem;
  }
`;

export default function CommentDetail({ comment_id }: IProps) {
  const { data, isLoading } = useCommentsDetailQuery(comment_id);

  if (!data) return null;

  const { like_user_ids, reply_ids, comment, ...comments } = data;

  return (
    <Container>
      {!isLoading ? (
        <>
          <CommentsHeader comment={comments} />
          <CommentsBody content={comment} mode="detail" />
          <Footer>
            <CommentsHeart
              comment_id={comment_id}
              like_user_ids={like_user_ids}
            />
            <CommentsReply comment_id={comment_id} reply_ids={reply_ids} />
          </Footer>
        </>
      ) : (
        <CommentDetailSkeleton />
      )}
    </Container>
  );
}
