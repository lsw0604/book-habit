import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CommentHeader from 'components/comments/comment-header';
import CommentReply from 'components/comments/comment-reply';
import CommentHeart from 'components/comments/comment-heart';
import CommentContent from 'components/comments/comment-content';
import Skeleton from 'components/common/Skeleton';

interface IProps {
  comment: Omit<CommentsItemType, 'age_category' | 'gender'>;
}

const Container = styled.li`
  box-sizing: border-box;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  cursor: pointer;
  scroll-snap-align: start;
`;

const Bottom = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: start;
  gap: 1rem;
  svg {
    width: 1rem;
  }
`;

export default function CommentItem({ comment }: IProps) {
  const navigate = useNavigate();

  const { comment_id, comment: content, reply_ids, like_user_ids } = comment;

  const navigateCommentDetailPage = () => navigate(`/comments/${comment_id}`);

  return (
    <Container>
      <CommentHeader comment={comment} />
      <CommentContent
        onClick={navigateCommentDetailPage}
        mode="item"
        content={content}
      />
      <Bottom>
        <CommentHeart comment_id={comment_id} like_user_ids={like_user_ids} />
        <CommentReply comment_id={comment_id} reply_ids={reply_ids} btn />
      </Bottom>
    </Container>
  );
}

const CommentItemLoaderContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  border-radius: 1rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const CommentItemLoaderHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CommentItemLoaderHeaderDescription = styled.div`
  width: 70%;
  height: 2.5rem;

  & > :first-child {
    margin-bottom: 0.25rem;
  }
`;

const CommentItemLoaderContent = styled.div`
  width: 100%;
  height: 7rem;
`;

const CommentItemLoaderFooter = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const CommentItemLoaderFooterWrapper = styled.div`
  height: 1.25rem;
  width: 50%;
  display: inline-flex;
  gap: 1rem;
`;

CommentItem.Loader = function CommentItemLoader() {
  return (
    <CommentItemLoaderContainer>
      <CommentItemLoaderHeader>
        <CommentItemLoaderHeaderDescription>
          <Skeleton width="70%" height="1.725rem" />
          <Skeleton width="40%" height="0.725rem" />
        </CommentItemLoaderHeaderDescription>
        <Skeleton width="2.5rem" height="2.5rem" isCircle />
      </CommentItemLoaderHeader>
      <CommentItemLoaderContent>
        <Skeleton width="100%" height="100%" />
      </CommentItemLoaderContent>
      <CommentItemLoaderFooter>
        <CommentItemLoaderFooterWrapper>
          <Skeleton width="100%" height="100%" />
          <Skeleton width="100%" height="100%" />
        </CommentItemLoaderFooterWrapper>
      </CommentItemLoaderFooter>
    </CommentItemLoaderContainer>
  );
};
