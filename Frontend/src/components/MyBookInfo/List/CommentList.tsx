import useMyBookCommentQuery from '@queries/myBook/useMyBookCommentQuery';
import CommentItem from 'components/MyBookInfo/Item/CommentItem';
import Loader from 'components/common/Loader';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 7.5rem;
  overflow: scroll;
  scroll-behavior: row;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmptyTag = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CommentList() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const { data, isLoading, isFetching } = useMyBookCommentQuery(
    parseInt(users_books_id)
  );

  return (
    <Container>
      {isLoading || isFetching ? (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      ) : data?.length === 0 ? (
        <EmptyTag>아직 등록된 한줄평이 없습니다.</EmptyTag>
      ) : (
        data?.map((comment) => (
          <CommentItem key={comment.comment_id} {...comment} />
        ))
      )}
    </Container>
  );
}
