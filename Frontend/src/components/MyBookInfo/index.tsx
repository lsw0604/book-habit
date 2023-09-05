import styled from 'styled-components';
import { Suspense, lazy, useState } from 'react';

import Selector from 'components/common/Selector';
import Accordion from 'components/common/Accordion';
import Loader from 'components/common/Loader';
import Divider from 'components/common/Divider';
import Button from 'components/common/Button';
import { IconTrashCan } from '@style/icons';
import { useParams } from 'react-router-dom';
import useMyBookListDeleteHook from '@hooks/useMyBookListDeleteHook';

const Info = lazy(() => import('components/MyBookInfo/Info'));
const Rating = lazy(() => import('components/MyBookInfo/List/Rating'));
const History = lazy(() => import('components/MyBookInfo/List/History'));
const AddForm = lazy(() => import('components/MyBookInfo/AddForm/index'));

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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  height: 28rem;
  overflow: scroll;
`;

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [value, setValue] = useState<string[]>([]);
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];
  const { mutate, isLoading } = useMyBookListDeleteHook(
    parseInt(users_books_id)
  );

  return (
    <Container>
      <Suspense
        fallback={
          <LoaderContainer style={{ height: '16rem' }}>
            <Loader />
          </LoaderContainer>
        }
      >
        <Info />
      </Suspense>
      <Divider divider={2} />
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
          <Suspense
            fallback={
              <LoaderContainer style={{ height: '12rem' }}>
                <Loader />
              </LoaderContainer>
            }
          >
            <History filter={value} />
          </Suspense>
        </Accordion>
        <Accordion label="평점보기">
          <Suspense fallback={<Loader />}>
            <Rating />
          </Suspense>
        </Accordion>
        <Accordion label="추가하기">
          <Suspense
            fallback={
              <LoaderContainer style={{ height: '17rem' }}>
                <Loader />
              </LoaderContainer>
            }
          >
            <AddForm />
          </Suspense>
        </Accordion>
        <Button
          icon={<IconTrashCan />}
          isLoading={isLoading}
          onClick={() => mutate(parseInt(users_books_id))}
        >
          삭제하기
        </Button>
      </Contents>
    </Container>
  );
}
