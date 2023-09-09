import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Selector from 'components/common/Selector';
import Accordion from 'components/common/Accordion';
import Info from 'components/MyBookInfo/Info';
import Rating from 'components/MyBookInfo/List/Rating';
import History from 'components/MyBookInfo/List/History';
import AddForm from 'components/MyBookInfo/AddForm';
import Comments from 'components/MyBookInfo/List/Comment';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 10rem);
  overflow: scroll;
  @media screen and (min-width: 714px) {
    display: flex;
  }
`;

const Stack = styled.div`
  width: 100%;
  padding: 10px;
  display: grid;
`;

const Header = styled.div`
  flex: 1;
`;

const Contents = styled.div`
  height: 69%;
  overflow: scroll;
  @media screen and (min-width: 714px) {
    height: 100%;
    flex: 3;
  }
`;

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [value, setValue] = useState<string[]>([]);
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];

  return (
    <Container>
      <Header>
        <Info />
      </Header>
      <Contents>
        <Accordion label="기록보기">
          <Stack>
            <Selector
              label="책 상태를 골라주세요."
              value={value}
              multiple
              onChange={(e) => setValue(e)}
              options={options}
            />
          </Stack>
          <History filter={value} />
        </Accordion>
        <Accordion label="평점보기">
          <Rating />
        </Accordion>
        <Accordion label="한줄평">
          <Comments />
        </Accordion>
        <Accordion label="추가하기">
          <AddForm />
        </Accordion>
      </Contents>
    </Container>
  );
}
