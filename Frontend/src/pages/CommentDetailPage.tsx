import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Loader from 'components/common/Loader';
import CommentReply from 'components/Comments/CommentReply';
import CommentHeart from 'components/Comments/CommentHeart';
import CommentHeaderInfo from 'components/Comments/CommentHeaderInfo';
import useCommentsDetailQuery from '@queries/comments/useCommentsDetailQuery';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Comment = styled.div`
  width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 25px;
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
      <Header>
        <CommentHeaderInfo
          name={data.name}
          title={data.title}
          profile={data.profile}
          created_at={data.created_at}
          rating={data.rating}
        />
      </Header>
      <Comment>{data.comment}</Comment>
      <Bottom>
        <CommentHeart comment_id={parseInt(comment_id)} />
      </Bottom>
      <CommentReply />
    </Container>
  );
}
