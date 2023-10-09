import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

import InfoBox from 'components/MyBookInfo/InfoBox';
import Calendar from 'components/calendar/Calendar';
import MyBookInfoHistoryList from 'components/History/List/MyBookInfoHistoryList';
import MyBookInfoCommentList from 'components/Comments/List/MyBookInfoCommentList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;

  .info {
    @media screen and (min-width: 1280px) {
      grid-area: 1 / 1 / 3 / 3;
    }
  }

  .calendar {
    @media screen and (min-width: 1280px) {
      grid-area: 1 / 3 / 7 / 6;
    }
  }

  .history {
    @media screen and (min-width: 1280px) {
      grid-area: 7 / 3 / 8 / 6;
    }
  }

  .comment {
    @media screen and (min-width: 1280px) {
      grid-area: 3 / 1 / 8 / 3;
    }
  }

  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

const Wrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
`;

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [filter, setFilter] = useState<string[]>(['전체보기']);

  return (
    <Container>
      <Wrapper className="info">
        <InfoBox />
      </Wrapper>
      <Wrapper className="calendar">
        <Calendar filter={filter} setFilter={setFilter} />
      </Wrapper>
      <Wrapper className="history">
        <MyBookInfoHistoryList filter={filter} />
      </Wrapper>
      <Wrapper className="comment">
        <MyBookInfoCommentList />
      </Wrapper>
    </Container>
  );
}
