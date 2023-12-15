import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Loader from 'components/common/Loader';
import { IconCommentDots } from '@style/icons';
import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';

interface IProps {
  comment_id: number;
  btn?: true;
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

export default function CommentDetailReply({ comment_id, btn }: IProps) {
  const navigate = useNavigate();
  const { data, isFetching, isLoading } = useCommentsReplyListQuery(comment_id);

  const navigateReply = () => {
    if (btn) navigate(`/comments/${comment_id}`);
  };

  return (
    <Container onClick={navigateReply}>
      <ReplyIconWrapper>
        <IconCommentDots />
      </ReplyIconWrapper>
      <ReplyNumber>
        {isFetching || isLoading ? <Loader /> : data?.reply.length}
      </ReplyNumber>
    </Container>
  );
}