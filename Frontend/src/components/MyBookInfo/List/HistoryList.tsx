import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

import Calendar from 'components/Calendar';
import Selector from 'components/common/Selector';
import HistoryItem from 'components/MyBookInfo/Item/HistoryItem';
import Loader from 'components/common/Loader';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import dayjs from 'dayjs';

const Container = styled.div`
  width: 100%;
  max-height: 2.5rem;
  overflow: scroll;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  position: relative;
`;

const Stack = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: grid;
`;

const EmptyTag = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HistoryList() {
  const { users_books_id } = useParams();

  if (users_books_id === undefined) {
    return <div>올바른 접근이 아닙니다.</div>;
  }

  const [filter, setFilter] = useState<string[]>(['전체보기']);
  const options = ['읽는중', '읽기시작함', '읽고싶음', '다읽음'];

  const {
    myBookHistoryData,
    myBookHistoryIsLoading,
    myBookHistoryIsFetching,
    myBookHistoryIsSuccess,
    myBookTimeData,
  } = useMyBookPageQueries(parseInt(users_books_id), filter);

  const startMonth = myBookTimeData?.startDate
    ? dayjs(myBookTimeData.startDate).add(9, 'hour').format('YYYY-MM-DD')
    : undefined;
  const endMonth = myBookTimeData?.endDate
    ? dayjs(myBookTimeData.endDate).add(9, 'hour').format('YYYY-MM-DD')
    : undefined;

  return (
    <>
      <Stack>
        <Selector
          value={filter}
          multiple
          onChange={(e) => setFilter(e)}
          options={options}
        />
      </Stack>
      <Calendar
        history={myBookHistoryData}
        startDate={startMonth}
        endDate={endMonth}
      />
      <Container>
        {myBookHistoryIsLoading || myBookHistoryIsFetching ? (
          <LoadingContainer>
            <Loader size={2} />
          </LoadingContainer>
        ) : myBookHistoryIsSuccess &&
          myBookHistoryData &&
          myBookHistoryData.length !== 0 ? (
          myBookHistoryData.map((value) => (
            <HistoryItem key={value.id} {...value} />
          ))
        ) : filter.length === 0 ? (
          <EmptyTag>태그를 선택해 주세요.</EmptyTag>
        ) : (
          <EmptyTag>검색 결과가 없습니다.</EmptyTag>
        )}
      </Container>
    </>
  );
}
