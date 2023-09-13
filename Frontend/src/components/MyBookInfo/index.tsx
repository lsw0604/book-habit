import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Accordion from 'components/common/Accordion';
import InfoBox from 'components/MyBookInfo/InfoBox';
import HistoryList from 'components/MyBookInfo/List/HistoryList';
import AddForm from 'components/MyBookInfo/AddForm';
import CommentsList from 'components/MyBookInfo/List/CommentList';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 10rem);
  overflow: scroll;
`;

const Header = styled.div`
  width: 100%;
  height: 30%;
`;

const Contents = styled.div`
  height: 70%;
  overflow: scroll;
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
        <Accordion label="추가하기">
          <AddForm />
        </Accordion>
      </Contents>
    </Container>
  );
}
