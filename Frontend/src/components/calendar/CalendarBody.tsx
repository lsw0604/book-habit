import styled from 'styled-components';

import CalendarDateBox from 'components/calendar/CalendarDateBox';
import useCalendarHook from '@hooks/useCalendarHook';

interface IProps {
  myBookHistoryData: MyBookPageQueriesHistoryListType;
  myBookTimeData: MyBookPageQueriesTimeRangeResponseType;
  users_books_id: number;
}

const Container = styled.div`
  width: 100%;
  height: calc(100% - 126px);

  @media screen and (min-width: 1280px) {
    display: flex;
    justify-content: center;
  }
`;

const Box = styled.div<{ numRows: number }>`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ numRows }) => `repeat(${numRows}, 1fr)`};

  @media screen and (min-width: 1280px) {
    width: 70%;
    height: 70%;
  }
`;

export default function CalendarBody({
  myBookHistoryData,
  myBookTimeData,
  users_books_id,
}: IProps) {
  const { numRows, startDate, endDate, dataByDate, calendarState } =
    useCalendarHook({ myBookHistoryData, myBookTimeData });

  return (
    <Container>
      <Box numRows={numRows}>
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
      </Box>
    </Container>
  );
}
