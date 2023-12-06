import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import InfoBox from 'components/MyBookInfo/InfoBox';
import Calendar from 'components/calendar/Calendar';
import MyBookInfoCommentList from 'components/Comments/List/MyBookInfoCommentList';
import MyBookInfoHistoryList from 'components/History/List/MyBookInfoHistoryList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;

  .info {
    @media screen and (min-width: 1280px) {
      grid-area: 1 / 1 / 5 / 3;
    }
  }

  .calendar {
    @media screen and (min-width: 1280px) {
      grid-area: 1 / 3 / 12 / 6;
    }
  }

  .history {
    @media screen and (min-width: 1280px) {
      grid-area: 11 / 1 / 12 / 3;
    }
  }

  .comment {
    @media screen and (min-width: 1280px) {
      grid-area: 5 / 1 / 11 / 3;
    }
  }

  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(11, 1fr);
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

  const [filter, setFilter] = useState<string[]>(['전체보기']);

  const parseIntUserBookId = parseInt(users_books_id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Wrapper className="info">
        <InfoBox users_books_id={parseIntUserBookId} />
      </Wrapper>
      <Wrapper className="calendar">
        <Calendar
          users_books_id={parseIntUserBookId}
          filter={filter}
          setFilter={setFilter}
        />
      </Wrapper>
      <Wrapper className="history">
        <MyBookInfoHistoryList
          users_books_id={parseIntUserBookId}
          filter={filter}
        />
      </Wrapper>
      <Wrapper className="comment">
        <MyBookInfoCommentList users_books_id={parseIntUserBookId} />
      </Wrapper>
    </Container>
  );
}
