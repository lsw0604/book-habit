import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CommentHeaderPublic from 'components/Comments/CommentHeaderPublic';
import CommentReply from 'components/Comments/CommentReply';
import CommentHeart from 'components/Comments/CommentHeart';

interface IProps {
  item: Omit<CommentsItemType, 'age_category' | 'gender'>;
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

const Header = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  font-size: 18px;
  color: ${({ theme }) => theme.mode.typo_main};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: 25px;
  overflow: hidden;
  -webkit-line-clamp: 4;
  height: 100px;
  white-space: pre-line;
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

export default function CommentsItemPublic({ item }: IProps) {
  const navigate = useNavigate();

  const { comment_id, comment, reply_user_id, like_user_id } = item;

  const navigateCommentDetailPage = () => navigate(`/comments/${comment_id}`);

  return (
    <Container>
      <Header>
        <CommentHeaderPublic item={item} />
      </Header>
      <Content onClick={navigateCommentDetailPage}>{comment}</Content>
      <Bottom>
        <CommentHeart comment_id={comment_id} like_user_id={like_user_id} />
        <CommentReply comment_id={comment_id} reply_user_id={reply_user_id} />
      </Bottom>
    </Container>
  );
}
