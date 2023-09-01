import styled from 'styled-components';
import { Suspense, lazy, useState } from 'react';

import Selector from 'components/common/Selector';
import Rating from 'components/MyBookInfo/Rating';
import Accordion from 'components/common/Accordion';
import { useParams } from 'react-router-dom';
import useMyBookInfoHook from '@hooks/useMyBookInfoHook';
import Loader from 'components/common/Loader';
import Divider from 'components/common/Divider';

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

const InfoContainer = styled.div`
  display: flex;
  gap: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .image-wrapper {
    overflow: hidden;
    border-radius: 5px;
    width: 100%;
    max-width: 120px;
    img {
      width: 100%;
      height: auto;
      object-fit: fill;
    }
  }

  .info-wrapper {
    color: ${({ theme }) => theme.mode.typo_main};
    font-size: 1.5rem;
    width: 100%;
  }
  margin-bottom: 8px;
`;
const Title = styled.div`
  padding: 0 1rem;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [value, setValue] = useState<string[]>([]);
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];

  const { data, isLoading } = useMyBookInfoHook(parseInt(users_books_id));

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <InfoContainer>
          <div className="image-wrapper">
            <img src={data?.result.image} alt={data?.result.title} />
          </div>
          <div className="info-wrapper">
            <Title>{data?.result.title}</Title>
            <div>description</div>
          </div>
        </InfoContainer>
      )}
      <Divider divider={18} />
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
