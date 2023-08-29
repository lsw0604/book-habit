import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Selector from 'components/common/Selector';
import List from 'components/MyBookInfo/List';
import AddForm from 'components/MyBookInfo/AddForm';
import Accordion from 'components/common/Accordion';

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const Stack = styled.div`
  width: 100%;
  padding: 10px;
  display: grid;
`;

export default function Index() {
  const { users_books_id } = useParams();
  if (users_books_id === undefined) return <div>잘못된 접근입니다.</div>;
  const [value, setValue] = useState<string[]>([]);
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];

  return (
    <Container>
      <Stack>
        <Selector
          label="책 상태를 골라주세요."
          value={value}
          multiple
          onChange={(e) => setValue(e)}
          options={options}
        />
      </Stack>
      <Accordion label="펼쳐보기">
        <List filter={value} />
      </Accordion>
      <Accordion label="추가하기">
        <AddForm />
      </Accordion>
    </Container>
  );
}
