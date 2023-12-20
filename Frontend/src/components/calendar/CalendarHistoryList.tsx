import styled from 'styled-components';
import { v4 } from 'uuid';

import CalendarHistoryItem from 'components/calendar/CalendarHistoryItem';
import CalendarHistorySkeleton from 'components/calendar/CalendarHistorySkeleton';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';

interface IProps {
  filter: string[];
  users_books_id: number;
}

const Container = styled.ul`
  width: 100%;
  height: 52px;
  overflow: scroll;
  position: relative;
  scroll-snap-type: y mandatory;
`;

export default function CalendarHistoryList({
  filter,
  users_books_id,
}: IProps) {
  const { myBookHistoryData, myBookHistoryIsLoading, myBookHistoryIsFetching } =
    useMyBookPageQueries(users_books_id, filter);

  if (!myBookHistoryData) return null;

  if (myBookHistoryIsLoading || myBookHistoryIsFetching)
    return <CalendarHistorySkeleton mode="isLoading" />;

  if (filter.length === 0) return <CalendarHistorySkeleton mode="isFilter" />;

  if (myBookHistoryData.length === 0)
    return <CalendarHistorySkeleton mode="isEmpty" />;

  return (
    <Container>
      {myBookHistoryData.map((data) => (
        <CalendarHistoryItem
          key={v4()}
          users_books_id={users_books_id}
          {...data}
        />
      ))}
    </Container>
  );
}
