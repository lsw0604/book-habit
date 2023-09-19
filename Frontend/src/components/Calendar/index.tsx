import styled from 'styled-components';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import DateBox from 'components/Calendar/DateBox';
import Icon from 'components/common/Button/Icon';
import Selector from 'components/common/Selector';
import { IconLeftArrow, IconRightArrow } from '@style/icons';
import { getMonthYearDetails, getNewMonthYear } from 'lib/utils/monthYear';
import { useParams } from 'react-router-dom';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';

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
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarHeading = styled.h1`
  font-size: 20px;
  line-height: 22px;
  width: 30%;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const CalendarSelectorWrapper = styled.div`
  display: flex;
  width: 70%;
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

export default function Index() {
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const [filter, setFilter] = useState<string[]>(['전체보기']);

  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const { myBookHistoryData, myBookTimeData } = useMyBookPageQueries(
    parseInt(users_books_id),
    filter
  );
  const startDate = myBookTimeData?.startDate
    ? dayjs(myBookTimeData.startDate).add(9, 'hour').format('YYYY-MM-DD')
    : undefined;
  const endDate = myBookTimeData?.endDate
    ? dayjs(myBookTimeData.endDate).add(9, 'hour').format('YYYY-MM-DD')
    : undefined;

  const dayObj = dayjs()
    .locale('ko')
    .year(parseInt(monthYear.year))
    .month(parseInt(monthYear.month) - 1);

  const numRows = Math.ceil((monthYear.firstDOW + monthYear.lastDate) / 7);

  const updateMonthYear = (monthIncrement: number): void => {
    setMonthYear((prev) => getNewMonthYear(prev, monthIncrement));
  };

  const dataByDate: IDateByData = {};
  myBookHistoryData?.forEach((item) => {
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

  useEffect(() => {
    if (myBookTimeData && myBookTimeData.endDate) {
      setMonthYear(
        getMonthYearDetails(dayjs(myBookTimeData.endDate).add(9, 'hour'))
      );
    }

    if (
      myBookTimeData &&
      myBookTimeData.endDate === undefined &&
      myBookTimeData.startDate
    ) {
      setMonthYear(
        getMonthYearDetails(dayjs(myBookTimeData.startDate).add(9, 'hour'))
      );
    }
  }, [myBookTimeData, myBookTimeData?.endDate, myBookTimeData?.startDate]);

  return (
    <Container>
      <CalendarHeader>
        <CalendarHeading>
          {monthYear.year}년 {parseInt(monthYear.month)}월
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
          disabled={!prevMonthHandler()}
          onClick={() => updateMonthYear(-1)}
          icon={<IconLeftArrow />}
        >
          previous
        </Icon>
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
        <Icon
          disabled={!nextMonthHandler()}
          onClick={() => updateMonthYear(1)}
          icon={<IconRightArrow />}
        >
          next
        </Icon>
      </Contents>
    </Container>
  );
}
