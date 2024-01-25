import styled from 'styled-components';
import dayjs from 'dayjs';

import CommentItem from 'components/comments/comment-item';
import CommentHashTag from 'components/comments/comment-hashtag';

import useCommentFilterHook from '@hooks/useCommentFilterHook';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import { LogoSad } from '@style/icons';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const CommentListWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

export default function CommentList() {
  const { addFilter, filter, removeFilter } = useCommentFilterHook();

  const { data, isLoading } = useCommentsListQuery(filter);

  if (!data || isLoading) return <CommentList.Loader />;
  if (data.comments.length === 0) return <CommentList.Empty />;

  return (
    <Container>
      <CommentHashTag
        addFilter={addFilter}
        data={data}
        filter={filter}
        removeFilter={removeFilter}
      />
      <CommentListWrapper>
        {data.comments.map((comment) => (
          <CommentItem comment={comment} key={comment.comment_id} />
        ))}
      </CommentListWrapper>
    </Container>
  );
}

CommentList.Loader = function CommentListLoader() {
  return (
    <Container>
      <CommentHashTag.Loader />
      <CommentListWrapper>
        <CommentItem.Loader />
        <CommentItem.Loader />
        <CommentItem.Loader />
      </CommentListWrapper>
    </Container>
  );
};

const CommentListEmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const CommentListEmptyBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 40%;
    opacity: 0.4;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`;

CommentList.Empty = function CommentListEmpty() {
  const MONTH = parseInt(dayjs().format('MM'));
  return (
    <CommentListEmptyContainer>
      <CommentListEmptyBackground>
        <LogoSad />
        <p>{MONTH}월에 등록된 한줄평이 없습니다.</p>
      </CommentListEmptyBackground>
    </CommentListEmptyContainer>
  );
};
