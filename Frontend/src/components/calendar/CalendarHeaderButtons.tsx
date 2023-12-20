import styled from 'styled-components';

import useCalendarHook from '@hooks/useCalendarHook';
import Icon from 'components/common/Button/Icon';
import { IconLeftArrow, IconRightArrow } from '@style/icons';

const Container = styled.div`
  height: auto;
`;

const Header = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.mode.typo_main};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
`;

export default function CalendarHeaderButtons({
  children,
  myBookHistoryData,
  myBookTimeData,
}: CalendarHeaderButtonsType) {
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
      <Body>{children}</Body>
    </Container>
  );
}
