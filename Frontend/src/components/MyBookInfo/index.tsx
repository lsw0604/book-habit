import styled from 'styled-components';
import { Suspense, lazy, useState } from 'react';
import { useParams } from 'react-router-dom';

import Selector from 'components/common/Selector';
import Rating from 'components/MyBookInfo/Rating';
import Accordion from 'components/common/Accordion';
import Loader from 'components/common/Loader';
import Divider from 'components/common/Divider';
import useMyBookInfoHook from '@hooks/useMyBookInfoHook';

const Info = lazy(() => import('components/MyBookInfo/Info'));
const List = lazy(() => import('components/MyBookInfo/List'));
const AddForm = lazy(() => import('components/MyBookInfo/AddForm'));

const Container = styled.div`
  width: 100%;
  height: auto;
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

export default function Index() {
  const [value, setValue] = useState<string[]>([]);
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];

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
      <Stack>
        <Selector
          label="책 상태를 골라주세요."
          value={value}
          multiple
          onChange={(e) => setValue(e)}
          options={options}
        />
      </Stack>
      <Accordion label="기록보기">
        <Suspense
          fallback={
            <LoaderContainer style={{ height: '16rem' }}>
              <Loader />
            </LoaderContainer>
          }
        >
          <List filter={value} />
        </Suspense>
      </Accordion>
      <Accordion label="평점보기">
        <Rating />
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
    </Container>
  );
}
