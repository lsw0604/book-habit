import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Selector from 'components/common/Selector';
import Accordion from 'components/common/Accordion';
import Button from 'components/common/Button';
import Info from 'components/MyBookInfo/Info';
import Rating from 'components/MyBookInfo/List/Rating';
import History from 'components/MyBookInfo/List/History';
import AddForm from 'components/MyBookInfo/AddForm';

import { IconTrashCan } from '@style/icons';
import useMyBookListDeleteMutation from '@queries/myBook/useMyBookListDeleteMutation';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 11rem);
  overflow: scroll;
`;

const Stack = styled.div`
  width: 100%;
  padding: 10px;
  display: grid;
`;

const Contents = styled.div`
  height: 25rem;
  overflow: scroll;
  @media screen and (min-width: 1024px) {
    height: 31rem;
  }
`;

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [value, setValue] = useState<string[]>([]);
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];
  const { mutate, isLoading } = useMyBookListDeleteMutation(
    parseInt(users_books_id)
  );

  return (
    <Container>
      <Info />
      <Stack>
        <Button
          icon={<IconTrashCan />}
          isLoading={isLoading}
          onClick={() => mutate(parseInt(users_books_id))}
        >
          삭제하기
        </Button>
      </Stack>
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
        <Accordion label="추가하기">
          <AddForm />
        </Accordion>
      </Contents>
    </Container>
  );
}
