import useCommentsReplyListQuery from '@queries/comments/useCommentsReplyListQuery';
import { IconCommentDots } from '@style/icons';
import Loader from 'components/common/Loader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  comment_id: number;
  isNavigateURI: string;
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

export default function CommentReply({ comment_id, isNavigateURI }: IProps) {
  const { data, isFetching, isLoading } = useCommentsReplyListQuery(comment_id);
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`${isNavigateURI}`)}>
      <ReplyIconWrapper>
        <IconCommentDots />
      </ReplyIconWrapper>
      <ReplyNumber>
        {isFetching || isLoading ? <Loader /> : data?.length}
      </ReplyNumber>
    </Container>
  );
}
