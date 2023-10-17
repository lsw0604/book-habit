import { memo } from 'react';
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
  overflow: scroll;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
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

export default function CommentsPage() {
  const MemorizedComponent = memo(PublicCommentsItem);

  const { data: comments, isFetching, isLoading } = useCommentsListQuery();

  return (
    <>
      {!isLoading ? (
        comments?.length === 0 ? (
          <EmptyContainer>
            {`${parseInt(dayjs().format('MM'))}`}월에 등록된 한줄평이 아직
            없어요.
          </EmptyContainer>
        ) : (
          <Container>
            <CommentTimer />
            {isFetching && (
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            )}
            {comments?.map((comment) => (
              <MemorizedComponent key={comment.comment_id} {...comment} />
            ))}
          </Container>
        )
      ) : (
        <LoaderContainer>
          <Loader size={2} />
        </LoaderContainer>
      )}
    </>
  );
}
