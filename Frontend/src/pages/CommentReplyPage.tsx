import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CommentReplyList from 'components/Comments/CommentReplyList';
import CommentReplyForm from 'components/Comments/CommentReplyForm';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  gap: 1rem;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
`;

const ReplyContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border-radius: 1rem;
`;

const Wrapper = styled.div`
  height: 80%;
  position: relative;
  width: 100%;
  overflow: scroll;
  margin-bottom: 1rem;
`;

export default function CommentReplyPage() {
  const { comment_id } = useParams();
  if (!comment_id) return <Container>잘못된 접근입니다.</Container>;

  return (
    <Container>
      <ReplyContainer>
        <Wrapper>
          <CommentReplyList />
        </Wrapper>
        <CommentReplyForm />
      </ReplyContainer>
    </Container>
  );
}
