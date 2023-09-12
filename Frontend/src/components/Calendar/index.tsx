import styled from 'styled-components';
import dayjs from 'dayjs';
import { useState } from 'react';

import DateBox from 'components/Calendar/DateBox';
import { getMonthYearDetails, getNewMonthYear } from 'lib/utils/monthYear';
import Icon from 'components/common/Button/Icon';
import { IconLeftArrow, IconRightArrow } from '@style/icons';
import Divider from 'components/common/Divider';

interface IProps {
  history?: MyBookPageQueriesHistoryListType;
  startDate?: string;
  endDate?: string;
}

interface IDateByData {
  [date: string]: string;
}

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.mode.sub};
  padding: 1rem;
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
  gap: 2px;
`;

export default function Index({ history, startDate, endDate }: IProps) {
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const numRows = Math.ceil((monthYear.firstDOW + monthYear.lastDate) / 7);

  const updateMonthYear = (monthIncrement: number): void => {
    setMonthYear((prev) => getNewMonthYear(prev, monthIncrement));
  };

  const prevButtonDisabledHandler = (startDate?: string) => {
    if (startDate) {
      return parseInt(startDate.split('-')[1]) > parseInt(monthYear.month) - 1;
    }
  };

  const nextButtonDisabledHandler = (endDate?: string) => {
    if (endDate) {
      return parseInt(endDate.split('-')[1]) < parseInt(monthYear.month) + 1;
    }
  };

  const dataByDate: IDateByData = {};
  history?.forEach((item) => {
    const dateStr = dayjs(item.date).add(9, 'hour').toISOString().split('T')[0];
    if (!dataByDate[dateStr]) {
      dataByDate[dateStr] = item.status;
    }
  });

  return (
    <Container>
      <CalendarHeader>
        <Icon
          onClick={() => updateMonthYear(-1)}
          icon={<IconLeftArrow />}
          disabled={prevButtonDisabledHandler(startDate)}
        >
          previous
        </Icon>
        <CalendarHeading>
          {monthYear.year} {monthYear.monthName}
        </CalendarHeading>
        <Icon
          onClick={() => updateMonthYear(1)}
          icon={<IconRightArrow />}
          disabled={nextButtonDisabledHandler(endDate)}
        >
          next
        </Icon>
      </CalendarHeader>
      <Divider divider={2} />
      <CalendarBox numRows={numRows}>
        <DateBox
          data={dataByDate}
          date={1}
          gridColumn={monthYear.firstDOW + 1}
          month={monthYear.month}
          year={monthYear.year}
        />
        {[...Array(monthYear.lastDate)].map((_, i) =>
          i > 0 ? (
            <DateBox
              data={dataByDate}
              key={i}
              date={i + 1}
              month={monthYear.month}
              year={monthYear.year}
            />
          ) : null
        )}
      </CalendarBox>
    </Container>
  );
}
