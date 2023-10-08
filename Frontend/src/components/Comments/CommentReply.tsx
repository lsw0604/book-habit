import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';
import { IconCommentDots } from '@style/icons';
import Loader from 'components/common/Loader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  comment_id: number;
}

const Container = styled.div`
  height: 18px;
  width: 50px;
  display: inline-flex;
  gap: 1rem;
`;

const ReplyNumber = styled.p`
  height: 100%;
  font-size: 100%;
  line-height: 100%;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const ReplyIconWrapper = styled.div`
  height: 100%;
  width: 1rem;
  cursor: pointer;
  svg {
    width: 100%;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function CommentReply({ comment_id }: IProps) {
  const { data, isFetching, isLoading } = useCommentsReplyListQuery(comment_id);
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate('reply')}>
      <ReplyIconWrapper>
        <IconCommentDots />
      </ReplyIconWrapper>
      <ReplyNumber>
        {isFetching || isLoading ? <Loader /> : data?.length}
      </ReplyNumber>
    </Container>
  );
}
