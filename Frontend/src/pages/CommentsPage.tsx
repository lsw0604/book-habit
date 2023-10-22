import styled from 'styled-components';
import dayjs from 'dayjs';

import Loader from 'components/common/Loader';
import PublicCommentsItem from 'components/Comments/Item/PublicCommentItem';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import CommentTimer from 'components/Comments/CommentTimer';

const Container = styled.ul`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FetchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

const TimerWrapper = styled.div`
  padding: 0 1rem;
`;

export default function CommentsPage() {
  const { data, isFetching, isLoading } = useCommentsListQuery();

  if (data === undefined || isLoading) {
    return (
      <LoaderContainer>
        <Loader size={2} />
      </LoaderContainer>
    );
  }

  const { comments } = data;

  if (comments.length === 0) {
    return (
      <EmptyContainer>
        {`${parseInt(dayjs().format('MM'))}`}월에 등록된 한줄평이 아직 없어요.
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <TimerWrapper>
        <CommentTimer />
      </TimerWrapper>
      {isFetching && (
        <FetchContainer>
          <Loader />
        </FetchContainer>
      )}
      <ListContainer>
        {data?.comments?.map((comment) => (
          <PublicCommentsItem key={comment.comment_id} {...comment} />
        ))}
      </ListContainer>
    </Container>
  );
}
