import styled from 'styled-components';
import CommentHeaderPublic from 'components/Comments/CommentHeaderPublic';
import useCommentsDetailQuery from '@queries/comments/useCommentsDetailQuery';

import CommentHeart from 'components/Comments/CommentHeart';
import CommentReply from 'components/CommentDetail/CommentReply';
import CommentDetailSkeleton from 'components/CommentDetail/CommentDetailSkeleton';

interface IProps {
  comment_id: string;
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

const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  const COMMENT_ID = parseInt(comment_id);

  const { data, isLoading } = useCommentsDetailQuery(COMMENT_ID);

  if (!data || isLoading)
    return (
      <Container>
        <CommentDetailSkeleton />
      </Container>
    );

  return (
    <Container>
      <Header>
        <CommentHeaderPublic item={data} />
      </Header>
      <Comment>{data.comment}</Comment>
      <Footer>
        <CommentHeart comment_id={COMMENT_ID} />
        <CommentReply comment_id={COMMENT_ID} />
      </Footer>
    </Container>
  );
}
