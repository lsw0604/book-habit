import styled from 'styled-components';
import Loader from 'components/common/Loader';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import PublicCommentsItem from 'components/Comments/Item/PublicCommentItem';

const Container = styled.ul`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;
  gap: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-row: masonry;
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CommentsPage() {
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
