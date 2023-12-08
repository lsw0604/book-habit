import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

import Selector from 'components/common/Selector';
import useCalendarHook from '@hooks/useCalendarHook';
import Icon from 'components/common/Button/Icon';
import { IconLeftArrow, IconRightArrow } from '@style/icons';

interface IProps {
  myBookHistoryData: MyBookPageQueriesHistoryListType;
  myBookTimeData: MyBookPageQueriesTimeRangeResponseType;
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
  options: string[];
}

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.mode.typo_main};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export default function CalendarHeader({
  myBookHistoryData,
  myBookTimeData,
  filter,
  setFilter,
  options,
}: IProps) {
  const { calendarState, prevMonthHandler, nextMonthHandler, updateMonthYear } =
    useCalendarHook({
      myBookHistoryData,
      myBookTimeData,
    });

  return (
    <Container>
      <Header>
        <Icon
          disabled={!prevMonthHandler}
          onClick={() => updateMonthYear(-1)}
          icon={<IconLeftArrow />}
        >
          previous
        </Icon>
        {calendarState.year}년 {calendarState.month}월
        <Icon
          disabled={!nextMonthHandler}
          onClick={() => updateMonthYear(1)}
          icon={<IconRightArrow />}
        >
          next
        </Icon>
      </Header>
      <Wrapper>
        <Selector
          multiple
          value={filter}
          onChange={(e) => setFilter(e)}
          options={options}
        />
      </Wrapper>
    </Container>
  );
}
