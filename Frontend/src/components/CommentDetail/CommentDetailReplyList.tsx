import styled from 'styled-components';

import Loader from 'components/common/Loader';
import CommentDetailReplyItem from 'components/CommentDetail/CommentDetailReplyItem';
import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';

interface IProps {
  comment_id: number;
}

const Container = styled.ul`
  width: 100%;
  height: 100%;
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
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
`;

export default function CommentDetailReplyList({ comment_id }: IProps) {
  const { data, isLoading, isFetching } = useCommentsReplyListQuery(comment_id);

  if (!data || isLoading) {
    return (
      <Container>
        <LoaderWrapper>
          <EmptyWrapper>
            <Loader />
          </EmptyWrapper>
        </LoaderWrapper>
      </Container>
    );
  }

  if (data.reply.length === 0)
    return (
      <Container>
        <EmptyWrapper>아직 등록된 댓글이 없습니다.</EmptyWrapper>
      </Container>
    );

  return (
    <Container>
      {data.reply.map((reply) => (
        <CommentDetailReplyItem key={reply.reply_id} {...reply} />
      ))}
      {isFetching ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : null}
    </Container>
  );
}
