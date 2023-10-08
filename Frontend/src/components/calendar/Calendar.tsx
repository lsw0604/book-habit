import styled from 'styled-components';
import dayjs from 'dayjs';
import { useEffect, useState, useMemo } from 'react';

import CalendarDateBox from 'components/calendar/CalendarDateBox';
import Icon from 'components/common/Button/Icon';
import Selector from 'components/common/Selector';
import { IconLeftArrow, IconRightArrow } from '@style/icons';
import { getCalendarDetail, getNewCalendar } from 'lib/utils/calendar';
import { useParams } from 'react-router-dom';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import { useRecoilState } from 'recoil';
import { calendarAtom } from 'recoil/calendar';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  padding: 1rem;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadow.lg};
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
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ numRows }) => `repeat(${numRows}, 1fr)`};
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
`;

export default function Calendar() {
  const options = ['전체보기', '읽는중', '읽기시작함', '읽고싶음', '다읽음'];
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [filter, setFilter] = useState<string[]>(['전체보기']);

  const [calendarState, setCalendarState] = useRecoilState(calendarAtom);

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
    .year(parseInt(calendarState.year))
    .month(parseInt(calendarState.month) - 1);

  const numRows = useMemo(() => {
    return Math.ceil((calendarState.firstDOW + calendarState.lastDate) / 7);
  }, [calendarState.firstDOW, calendarState.lastDate]);

  const updateMonthYear = (monthIncrement: number): void => {
    setCalendarState((prev) => getNewCalendar(prev, monthIncrement));
  };

  const dataByDate = useMemo(() => {
    const data: CalendarDateByDataType = {};
    myBookHistoryData?.forEach((item) => {
      const dateStr = dayjs(item.date).add(9, 'hour').format('YYYY-MM-DD');
      data[dateStr] = data[dateStr] || [];
      data[dateStr].push(item.status);
    });
    return data;
  }, [myBookHistoryData]);

  const prevMonthHandler: boolean = useMemo(() => {
    if (startDate) {
      return dayObj.isAfter(startDate, 'month');
    }
    return true;
  }, [startDate, updateMonthYear]);

  const nextMonthHandler: boolean = useMemo(() => {
    if (endDate) {
      return dayObj.isBefore(endDate, 'month');
    }
    return dayObj.isBefore(dayjs(), 'month');
  }, [endDate, updateMonthYear]);

  useEffect(() => {
    if (myBookTimeData && myBookTimeData.endDate) {
      setCalendarState(getCalendarDetail(dayjs(myBookTimeData.endDate)));
    }

    if (
      myBookTimeData &&
      myBookTimeData.endDate === undefined &&
      myBookTimeData.startDate
    ) {
      setCalendarState(getCalendarDetail(dayjs(myBookTimeData.startDate)));
    }
  }, [myBookTimeData, myBookTimeData?.endDate, myBookTimeData?.startDate]);

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
            usersBooksId={parseInt(users_books_id)}
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
                usersBooksId={parseInt(users_books_id)}
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
