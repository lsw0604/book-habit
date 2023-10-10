import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CommentHeart from 'components/Comments/CommentHeart';
import CommentHeaderInfo from 'components/Comments/CommentHeaderInfo';

const Container = styled.li`
  box-sizing: border-box;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  cursor: pointer;
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

export default function PublicCommentsItem({
  comment,
  comment_id,
  created_at,
  name,
  rating,
  title,
  profile,
  status,
}: CommentsItemType) {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <CommentHeaderInfo
          title={title}
          name={name}
          rating={rating}
          profile={profile}
          created_at={created_at}
          status={status}
        />
      </Header>
      <Content onClick={() => navigate(`/comments/${comment_id}`)}>
        {comment}
      </Content>
      <Bottom>
        <CommentHeart comment_id={comment_id} />
      </Bottom>
    </Container>
  );
}
