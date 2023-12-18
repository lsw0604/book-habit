import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CommentsHeader from 'components/Comments/CommentsHeader';
import CommentsReply from 'components/Comments/CommentsReply';
import CommentsHeart from 'components/Comments/CommentsHeart';
import CommentsBody from 'components/Comments/CommentsBody';

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

export default function CommentsItem({ comment }: IProps) {
  const navigate = useNavigate();

  const { comment_id, comment: content, reply_ids, like_user_ids } = comment;

  const navigateCommentDetailPage = () => navigate(`/comments/${comment_id}`);

  return (
    <Container>
      <CommentsHeader comment={comment} />
      <CommentsBody
        onClick={navigateCommentDetailPage}
        mode="item"
        content={content}
      />
      <Bottom>
        <CommentsHeart comment_id={comment_id} like_user_ids={like_user_ids} />
        <CommentsReply comment_id={comment_id} reply_ids={reply_ids} btn />
      </Bottom>
    </Container>
  );
}
