import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Loader from 'components/common/Loader';
import CommentHeart from 'components/Comments/CommentHeart';
import CommentHeaderInfo from 'components/Comments/CommentHeaderInfo';
import useCommentsDetailQuery from '@queries/comments/useCommentsDetailQuery';
import CommentReply from 'components/Comments/CommentReply';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 1rem;
  gap: 1rem;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
`;

const DetailContainer = styled.div`
  gap: 1rem;
  width: 100%;
  height: auto;
  padding: 1rem;
  display: flex;
  position: relative;
  border-radius: 1rem;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Comment = styled.div`
  width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 25px;
  white-space: pre-line;
  color: ${({ theme }) => theme.mode.typo_main};
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

export default function CommentDetailPage() {
  const { comment_id } = useParams();

  if (!comment_id) return <Container>잘못된 접근입니다.</Container>;

  const { data, isLoading } = useCommentsDetailQuery(parseInt(comment_id));

  if (!data)
    return (
      <Container>해당 Comment의 정보를 불러오는데 실패했습니다.</Container>
    );

  if (isLoading)
    return (
      <Container>
        <Loader size={2} />
      </Container>
    );

  return (
    <Container>
      <DetailContainer>
        <Header>
          <CommentHeaderInfo
            name={data.name}
            title={data.title}
            profile={data.profile}
            created_at={data.created_at}
            rating={data.rating}
            status={data.status}
          />
        </Header>
        <Comment>{data.comment}</Comment>
        <Bottom>
          <CommentHeart comment_id={parseInt(comment_id)} />
          <CommentReply
            comment_id={parseInt(comment_id)}
            isNavigateURI="reply"
          />
        </Bottom>
      </DetailContainer>
    </Container>
  );
}
