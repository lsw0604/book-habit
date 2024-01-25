import styled from 'styled-components';

import HelmetProvider from 'components/common/HelmetProvider';
import CommentList from 'components/comments/comment-list';
import CommentTimer from 'components/comments/comment-timer';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TimerWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function CommentsPage() {
  return (
    <HelmetProvider
      title="한줄평"
      description="한줄평을 보여주는 페이지입니다."
    >
      <Container>
        <TimerWrapper>
          <CommentTimer />
        </TimerWrapper>
        <CommentList />
      </Container>
    </HelmetProvider>
  );
}
