import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CommentDetailPage() {
  const { comment_id } = useParams();
  if (!comment_id) return <Container>잘못된 접근입니다.</Container>;
  return <Container>{comment_id}</Container>;
}
