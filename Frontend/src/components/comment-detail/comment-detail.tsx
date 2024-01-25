import styled from 'styled-components';

import CommentHeader from 'components/comments/comment-header';
import CommentHeart from 'components/comments/comment-heart';
import CommentReply from 'components/comments/comment-reply';
import CommentContent from 'components/comments/comment-content';

import useCommentsDetailQuery from '@queries/comments/useCommentsDetailQuery';
import CommentItem from 'components/comments/comment-item';

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

  if (!data || isLoading) return <CommentItem.Loader />;

  const { like_user_ids, reply_ids, comment, ...comments } = data;

  return (
    <Container>
      <CommentHeader comment={comments} />
      <CommentContent content={comment} mode="detail" />
      <Footer>
        <CommentHeart comment_id={comment_id} like_user_ids={like_user_ids} />
        <CommentReply comment_id={comment_id} reply_ids={reply_ids} />
      </Footer>
    </Container>
  );
}
