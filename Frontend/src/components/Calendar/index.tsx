import styled from 'styled-components';
import dayjs from 'dayjs';
import { useState } from 'react';

import DateBox from 'components/Calendar/DateBox';
import Icon from 'components/common/Button/Icon';
import Divider from 'components/common/Divider';
import { IconLeftArrow, IconRightArrow } from '@style/icons';
import { getMonthYearDetails, getNewMonthYear } from 'lib/utils/monthYear';
import { useParams } from 'react-router-dom';

interface IProps {
  history?: MyBookPageQueriesHistoryListType;
  startDate?: string;
  endDate?: string;
}

interface IDateByData {
  [date: string]: HistoryStatusType[];
}

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.mode.sub};
  padding: 0 1rem;
  position: relative;
`;

const CalendarHeader = styled.div`
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarHeading = styled.h1`
  font-size: 20px;
  line-height: 22px;
`;

const CalendarBox = styled.div<{ numRows: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ numRows }) => `repeat(${numRows}, 1fr)`};
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
`;

export default function Index({ history, startDate, endDate }: IProps) {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const dayObj = dayjs()
    .locale('ko')
    .year(parseInt(monthYear.year))
    .month(parseInt(monthYear.month) - 1);

  const numRows = Math.ceil((monthYear.firstDOW + monthYear.lastDate) / 7);

  const updateMonthYear = (monthIncrement: number): void => {
    setMonthYear((prev) => getNewMonthYear(prev, monthIncrement));
  };

  const dataByDate: IDateByData = {};
  history?.forEach((item) => {
    const dateStr = dayjs(item.date).add(9, 'hour').toISOString().split('T')[0];
    dataByDate[dateStr] = dataByDate[dateStr] || [];
    dataByDate[dateStr].push(item.status);
  });

  const prevMonthHandler = () => {
    if (startDate) {
      return dayObj.isAfter(startDate, 'month');
    }
    return true;
  };

  const nextMonthHandler = () => {
    if (endDate) {
      return dayObj.isBefore(endDate, 'month');
    }
    return dayObj.isBefore(dayjs(), 'month');
  };

  return (
    <Container>
      <CalendarHeader>
        <Icon
          disabled={!prevMonthHandler()}
          onClick={() => updateMonthYear(-1)}
          icon={<IconLeftArrow />}
        >
          previous
        </Icon>
        <CalendarHeading>
          {monthYear.year}년 {parseInt(monthYear.month)}월
        </CalendarHeading>
        <Icon
          disabled={!nextMonthHandler()}
          onClick={() => updateMonthYear(1)}
          icon={<IconRightArrow />}
        >
          next
        </Icon>
      </CalendarHeader>
      <Divider divider={2} />
      <Contents>
        <CalendarBox numRows={numRows}>
          <DateBox
            startDate={startDate}
            endDate={endDate}
            usersBooksId={parseInt(users_books_id)}
            data={dataByDate}
            date={1}
            gridColumn={monthYear.firstDOW + 1}
            month={monthYear.month}
            year={monthYear.year}
          />
          {[...Array(monthYear.lastDate)].map((_, i) =>
            i > 0 ? (
              <DateBox
                startDate={startDate}
                endDate={endDate}
                usersBooksId={parseInt(users_books_id)}
                data={dataByDate}
                key={i}
                date={i + 1}
                month={monthYear.month}
                year={monthYear.year}
              />
            ) : null
          )}
        </CalendarBox>
      </Contents>
    </Container>
  );
}
