import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import InfoBox from 'components/MyBookInfo/InfoBox';
import Calendar from 'components/Calendar';
import HistoryList from 'components/MyBookInfo/List/HistoryList';
import CommentsList from 'components/MyBookInfo/List/CommentList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 30%;
  @media screen and (min-width: 1280px) {
    height: 70%;
    grid-area: 1 / 1 / 3 / 3;
  }
`;

const Contents = styled.div`
  height: 70%;
  overflow: scroll;
  box-sizing: border-box;
  @media screen and (min-width: 1280px) {
    height: 100%;
    width: 100%;
    grid-area: 1 / 3 / 6 / 8;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(7, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

const CalendarWrapper = styled.div`
  @media screen and (min-width: 1280px) {
    grid-area: 1 / 1 / 6 / 4;
  }
`;

const HistoryListWrapper = styled.div`
  @media screen and (min-width: 1280px) {
    grid-area: 6 / 1 / 8 / 4;
  }
`;

const CommentListWrapper = styled.div`
  @media screen and (min-width: 1280px) {
    height: 100%;
    overflow: scroll;
    grid-area: 1 / 4 / 8 / 6;
  }
`;

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  return (
    <Container>
      <Header>
        <InfoBox />
      </Header>
      <Contents>
        <CalendarWrapper>
          <Calendar />
        </CalendarWrapper>
        <HistoryListWrapper>
          <HistoryList />
        </HistoryListWrapper>
        <CommentListWrapper>
          <CommentsList />
        </CommentListWrapper>
      </Contents>
    </Container>
  );
}
