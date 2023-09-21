import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import Loader from 'components/common/Loader';
import styled from 'styled-components';
import PublicCommentsItem from '../Item/PublicCommentItem';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 1rem;
  gap: 1rem;
  position: relative;
  overflow: scroll;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PublicCommentsList() {
  const { data: comments, isFetching, isLoading } = useCommentsListQuery();

  return (
    <Container>
      {isLoading || isFetching ? (
        <LoaderContainer>
          <Loader size={2} />
        </LoaderContainer>
      ) : (
        comments?.map((comment) => (
          <PublicCommentsItem key={comment.comment_id} {...comment} />
        ))
      )}
    </Container>
  );
}
