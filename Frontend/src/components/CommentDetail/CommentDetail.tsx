import styled from 'styled-components';

import CommentsHeader from 'components/Comments/CommentsHeader';
import CommentDetailHeart from 'components/CommentDetail/CommentDetailHeart';
import CommentDetailReply from 'components/CommentDetail/CommentDetailReply';
import CommentDetailSkeleton from 'components/CommentDetail/CommentDetailSkeleton';
import useCommentsDetailQuery from '@queries/comments/useCommentsDetailQuery';

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

const Comment = styled.div`
  width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 25px;
  white-space: pre-line;
  color: ${({ theme }) => theme.mode.typo_main};
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

  if (!data || isLoading)
    return (
      <Container>
        <CommentDetailSkeleton />
      </Container>
    );

  return (
    <Container>
      <CommentsHeader item={data} />
      <Comment>{data.comment}</Comment>
      <Footer>
        <CommentDetailHeart comment_id={comment_id} />
        <CommentDetailReply comment_id={comment_id} />
      </Footer>
    </Container>
  );
}
