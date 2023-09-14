import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Accordion from 'components/common/Accordion';
import InfoBox from 'components/MyBookInfo/InfoBox';
import HistoryList from 'components/MyBookInfo/List/HistoryList';
import CommentsList from 'components/MyBookInfo/List/CommentList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Header = styled.div`
  width: 100%;
  height: 30%;
`;

const Contents = styled.div`
  height: 70%;
  overflow: scroll;
  @media screen and (min-width: 1280px) {
    height: 100%;
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
        <Accordion label="기록보기">
          <HistoryList />
        </Accordion>
        <Accordion label="한줄평">
          <CommentsList />
        </Accordion>
      </Contents>
    </Container>
  );
}
