import styled from 'styled-components';
import dayjs from 'dayjs';
import { useState } from 'react';

import DateBox from 'components/Calendar/DateBox';
import Icon from 'components/common/Button/Icon';
import Divider from 'components/common/Divider';
import { IconLeftArrow, IconRightArrow } from '@style/icons';
import { getMonthYearDetails, getNewMonthYear } from 'lib/utils/monthYear';

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

export default function Index({ history }: IProps) {
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

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

  return (
    <Container>
      <CalendarHeader>
        <CalendarHeading>
          {monthYear.year}년 {parseInt(monthYear.month)}월
        </CalendarHeading>
      </CalendarHeader>
      <Divider divider={2} />
      <Contents>
        <Icon onClick={() => updateMonthYear(-1)} icon={<IconLeftArrow />}>
          previous
        </Icon>
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
        <Icon onClick={() => updateMonthYear(1)} icon={<IconRightArrow />}>
          next
        </Icon>
      </Contents>
    </Container>
  );
}
