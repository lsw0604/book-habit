import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IconCommentDots } from '@style/icons';

interface IProps {
  comment_id: number;
  reply_user_id: { user_id: number }[];
}

const Container = styled.div`
  height: 18px;
  width: 50px;
  display: inline-flex;
  gap: 1rem;
  cursor: pointer;
`;

const ReplyNumber = styled.div`
  height: 100%;
  font-size: 100%;
  line-height: 100%;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const ReplyIconWrapper = styled.div`
  height: 100%;
  width: 1rem;
  svg {
    width: 100%;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function CommentsReply({ reply_user_id, comment_id }: IProps) {
  const navigate = useNavigate();
  const navigateCommentDetail = () => navigate(`/comments/${comment_id}`);

  return (
    <Container onClick={navigateCommentDetail}>
      <ReplyIconWrapper>
        <IconCommentDots />
      </ReplyIconWrapper>
      <ReplyNumber>{reply_user_id.length}</ReplyNumber>
    </Container>
  );
}
