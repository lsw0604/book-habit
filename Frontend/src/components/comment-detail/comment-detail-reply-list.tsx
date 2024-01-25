import styled from 'styled-components';

import CommentDetailReplyItem from 'components/comment-detail/comment-detail-reply-item';

import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';

interface CommentDetailReplyListProps {
  comment_id: number;
}

const Container = styled.ul`
  width: 100%;
  display: flex;
  overflow: auto;
  position: relative;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mode.sub};
  margin-bottom: 0.725rem;
`;

export default function CommentDetailReplyList({
  comment_id,
}: CommentDetailReplyListProps) {
  const { data, isLoading } = useCommentsReplyListQuery(comment_id);

  if (!data || isLoading) return <CommentDetailReplyList.Loader />;
  if (data?.length === 0) return <CommentDetailReplyList.Empty />;

  return (
    <Container>
      {data?.map((reply) => (
        <CommentDetailReplyItem
          key={reply.reply_id}
          comment_id={comment_id}
          {...reply}
        />
      ))}
    </Container>
  );
}

const CommentDetailReplyListEmptyContainer = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  margin-bottom: 0.75rem;
`;

const CommentDetailReplyListEmptyBackground = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

CommentDetailReplyList.Empty = function CommentDetailReplyListEmpty() {
  return (
    <CommentDetailReplyListEmptyContainer>
      <CommentDetailReplyListEmptyBackground>
        아직 등록된 댓글이 없습니다.
      </CommentDetailReplyListEmptyBackground>
    </CommentDetailReplyListEmptyContainer>
  );
};

const CommentDetailReplyListLoaderContainer = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  margin-bottom: 0.75rem;
  flex-direction: column;
`;

CommentDetailReplyList.Loader = function CommentDetailReplyListLoader() {
  return (
    <CommentDetailReplyListLoaderContainer>
      <CommentDetailReplyItem.Loader />
      <CommentDetailReplyItem.Loader />
      <CommentDetailReplyItem.Loader />
    </CommentDetailReplyListLoaderContainer>
  );
};
