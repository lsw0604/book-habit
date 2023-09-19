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
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 30%;
  @media screen and (min-width: 1280px) {
    padding-top: 2rem;
    height: 100%;
    grid-area: 1 / 1 / 3 / 3;
    border-radius: 2rem;
    box-shadow: ${({ theme }) => theme.shadow.lg};
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
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    padding: 2rem;
  }
`;

const CalendarWrapper = styled.div`
  @media screen and (min-width: 1280px) {
    grid-area: 1 / 1 / 6 / 4;
    box-shadow: ${({ theme }) => theme.shadow.lg};
    border-radius: 2rem;
  }
`;

const HistoryListWrapper = styled.div`
  @media screen and (min-width: 1280px) {
    grid-area: 6 / 1 / 8 / 4;
    box-shadow: ${({ theme }) => theme.shadow.lg};
    border-radius: 2rem;
  }
`;

const CommentListWrapper = styled.div`
  @media screen and (min-width: 1280px) {
    height: 100%;
    overflow: scroll;
    grid-area: 1 / 4 / 8 / 6;
    border-radius: 2rem;
    box-shadow: ${({ theme }) => theme.shadow.lg};
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
