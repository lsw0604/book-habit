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
  width: 100%;
  display: grid;
  grid-template-columns: 120px calc(100% - 128px);
  gap: 8px;
  margin-bottom: 8px;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 5px;
  width: 100%;
  max-width: 120px;
  img {
    width: 100%;
    height: auto;
    object-fit: fill;
  }
`;

const DetailContainer = styled.div`
  display: block;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.mode.typo_main};
`;
const Title = styled.div`
  padding: 0 1rem;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 8px;
`;

const Description = styled.span`
  display: block;
  font-size: 13px;
`;

const A = styled.a`
  font-size: 10px;
  width: auto;
  color: inherit;
  &:visited {
    color: ${({ theme }) => theme.mode.typo_main};
  }
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
          <ImageWrapper>
            <img src={data?.result?.image} alt={data?.result.title} />
          </ImageWrapper>
          <DetailContainer>
            <Title>제목 : {data?.result.title}</Title>
            <Description>{data?.result.contents}&nbsp;</Description>
            <A href={data?.result.url} target="_blank" rel="noreferrer">
              더보기...
            </A>
          </DetailContainer>
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
