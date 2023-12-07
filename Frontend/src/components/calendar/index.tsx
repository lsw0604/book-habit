import styled from 'styled-components';
import { useState } from 'react';

import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import Loader from 'components/common/Loader';
import CalendarHeader from 'components/calendar/CalendarHeader';
import CalendarHistoryList from 'components/calendar/CalendarHistoryList';
import CalendarBody from 'components/calendar/CalendarBody';

interface IProps {
  users_books_id: number;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  padding: 1rem;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const EmptyContainer = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function Calendar({ users_books_id }: IProps) {
  const [filter, setFilter] = useState(['전체보기']);

  const {
    myBookHistoryData,
    myBookTimeData,
    myBookTimeIsLoading,
    myBookHistoryIsLoading,
  } = useMyBookPageQueries(users_books_id, filter);

  if (!myBookTimeData || !myBookHistoryData) {
    return (
      <Container>
        <EmptyContainer>데이터를 불러오는데 실패 했습니다.</EmptyContainer>
      </Container>
    );
  }

  if (myBookTimeIsLoading || myBookHistoryIsLoading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <CalendarHeader
        myBookHistoryData={myBookHistoryData}
        myBookTimeData={myBookTimeData}
        setFilter={setFilter}
        filter={filter}
      />
      <CalendarBody
        myBookHistoryData={myBookHistoryData}
        myBookTimeData={myBookTimeData}
        users_books_id={users_books_id}
      />
      <CalendarHistoryList filter={filter} users_books_id={users_books_id} />
    </Container>
  );
}
