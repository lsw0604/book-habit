import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { Navigate } from 'react-router-dom';

import CalendarDateBox from 'components/calendar/CalendarDateBox';
import Icon from 'components/common/Button/Icon';
import Selector from 'components/common/Selector';
import { IconLeftArrow, IconRightArrow } from '@style/icons';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import Loader from 'components/common/Loader';
import useCalendarHook from '@hooks/useCalendarHook';

interface IProps {
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
  users_books_id: number;
}

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

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  padding: 1rem;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const CalendarHeader = styled.div`
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarHeading = styled.h1`
  font-size: 16px;
  line-height: 20px;
  width: 33%;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const CalendarSelectorWrapper = styled.div`
  display: flex;
  width: 70%;
`;

const CalendarBox = styled.div<{ numRows: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ numRows }) => `repeat(${numRows}, 1fr)`};
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
`;

export default function Calendar({
  filter,
  setFilter,
  users_books_id,
}: IProps) {
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];
  if (!users_books_id) return <Navigate to="/404" />;

  const {
    myBookHistoryData,
    myBookTimeData,
    myBookTimeIsLoading,
    myBookHistoryIsLoading,
  } = useMyBookPageQueries(users_books_id, filter);

  if (
    !myBookTimeData ||
    !myBookHistoryData ||
    myBookTimeIsLoading ||
    myBookHistoryIsLoading
  ) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  const {
    updateMonthYear,
    numRows,
    startDate,
    endDate,
    dataByDate,
    calendarState,
    nextMonthHandler,
    prevMonthHandler,
  } = useCalendarHook({ myBookHistoryData, myBookTimeData });

  return (
    <Container>
      <CalendarHeader>
        <CalendarHeading>
          {calendarState.year}년 {parseInt(calendarState.month)}월
        </CalendarHeading>
        <CalendarSelectorWrapper>
          <Selector
            multiple
            value={filter}
            onChange={(e) => setFilter(e)}
            options={options}
          />
        </CalendarSelectorWrapper>
      </CalendarHeader>
      <Contents>
        <Icon
          disabled={!prevMonthHandler}
          onClick={() => updateMonthYear(-1)}
          icon={<IconLeftArrow />}
        >
          previous
        </Icon>
        <CalendarBox numRows={numRows}>
          <CalendarDateBox
            startDate={startDate}
            endDate={endDate}
            usersBooksId={users_books_id}
            data={dataByDate}
            date={1}
            gridColumn={calendarState.firstDOW + 1}
            month={calendarState.month}
            year={calendarState.year}
          />
          {[...Array(calendarState.lastDate)].map((_, i) =>
            i > 0 ? (
              <CalendarDateBox
                startDate={startDate}
                endDate={endDate}
                usersBooksId={users_books_id}
                data={dataByDate}
                key={i}
                date={i + 1}
                month={calendarState.month}
                year={calendarState.year}
              />
            ) : null
          )}
        </CalendarBox>
        <Icon
          disabled={!nextMonthHandler}
          onClick={() => updateMonthYear(1)}
          icon={<IconRightArrow />}
        >
          next
        </Icon>
      </Contents>
    </Container>
  );
}
