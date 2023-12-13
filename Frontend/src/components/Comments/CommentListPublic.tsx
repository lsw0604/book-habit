import styled from 'styled-components';

import PublicCommentsItem from 'components/Comments/CommentItemPublic';
import CommentLoading from './CommentLoading';

interface IProps {
  comments: CommentsListType;
  isLoading: boolean;
  isFetching: boolean;
}

const Container = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

export default function CommentListPublic({
  comments,
  isLoading,
  isFetching,
}: IProps) {
  if (isLoading || isFetching) return <CommentLoading height="100%" />;

  return (
    <Container>
      {comments.map((comment) => (
        <PublicCommentsItem item={comment} key={comment.comment_id} />
      ))}
    </Container>
  );
}
