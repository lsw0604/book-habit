import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';
import Loader from 'components/common/Loader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentReplyItem from './CommentReplyItem';

const Container = styled.ul`
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: ${({ theme }) => theme.mode.sub};
`;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
`;

export default function CommentReplyList() {
  const { comment_id } = useParams();
  if (!comment_id) return <Container>잘못된 접근입니다.</Container>;

  const { data, isLoading, isFetching } = useCommentsReplyListQuery(
    parseInt(comment_id)
  );

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : data && data?.length > 0 ? (
        data.map((v) => <CommentReplyItem key={v.reply_id} {...v} />)
      ) : (
        <EmptyWrapper>아직 등록된 댓글이 없습니다.</EmptyWrapper>
      )}
      {isFetching ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : null}
    </Container>
  );
}
