import styled from 'styled-components';
import { useState } from 'react';

import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import CalendarHeader from 'components/calendar/CalendarHeader';
import CalendarHistoryList from 'components/calendar/CalendarHistoryList';
import CalendarBody from 'components/calendar/CalendarBody';
import CalendarSkeleton from './CalendarSkeleton';

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
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const options = ['읽는중', '읽기시작함', '읽고싶음', '다읽음'];

export default function Calendar({ users_books_id }: IProps) {
  const [filter, setFilter] = useState(['전체보기']);

  const {
    myBookHistoryData,
    myBookTimeData,
    myBookTimeIsLoading,
    myBookHistoryIsLoading,
  } = useMyBookPageQueries(users_books_id, filter);

  if (!myBookTimeData || !myBookHistoryData)
    return <CalendarSkeleton mode="empty" />;

  if (myBookTimeIsLoading || myBookHistoryIsLoading)
    return <CalendarSkeleton mode="loading" />;

  return (
    <Container>
      <CalendarHeader
        myBookHistoryData={myBookHistoryData}
        myBookTimeData={myBookTimeData}
        setFilter={setFilter}
        filter={filter}
        options={options}
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
