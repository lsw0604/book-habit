import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import Loader from 'components/common/Loader';
import styled from 'styled-components';
import PublicCommentsItem from '../Item/PublicCommentItem';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  overflow: scroll;
  gap: 1rem;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  @media screen and (min-width: 1280px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
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
    <>
      {!isLoading || !isFetching ? (
        <Container>
          {comments?.map((comment) => (
            <PublicCommentsItem key={comment.comment_id} {...comment} />
          ))}
        </Container>
      ) : (
        <LoaderContainer>
          <Loader size={2} />
        </LoaderContainer>
      )}
    </>
  );
}
