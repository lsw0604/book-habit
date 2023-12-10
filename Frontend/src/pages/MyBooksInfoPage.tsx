import styled from 'styled-components';
import { useEffect, memo } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import InfoBox from 'components/MyBookInfo/InfoBox';
import Calendar from 'components/calendar';
import CommentListPrivate from 'components/Comments/CommentListPrivate';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;

  .info {
    @media screen and (min-width: 1280px) {
      grid-area: 1 / 1 / 4 / 3;
    }
  }

  .calendar {
    @media screen and (min-width: 1280px) {
      grid-area: 1 / 3 / 20 / 6;
    }
  }

  .comment {
    @media screen and (min-width: 1280px) {
      grid-area: 7 / 1 / 20 / 3;
    }
  }

  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(19, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

const Wrapper = styled.div`
  padding: 1rem;
`;

export default function MyBookInfoPage() {
  const { users_books_id } = useParams();

  if (!users_books_id) return <Navigate to="/404" />;

  const USERS_BOOKS_ID = parseInt(users_books_id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const MemorizedInfoBox = memo(InfoBox);
  const MemorizedCommentList = memo(CommentListPrivate);

  return (
    <Container>
      <Wrapper className="info">
        <MemorizedInfoBox users_books_id={USERS_BOOKS_ID} />
      </Wrapper>
      <Wrapper className="calendar">
        <Calendar users_books_id={USERS_BOOKS_ID} />
      </Wrapper>
      <Wrapper className="comment">
        <MemorizedCommentList users_books_id={USERS_BOOKS_ID} />
      </Wrapper>
    </Container>
  );
}
