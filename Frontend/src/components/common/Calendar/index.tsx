import styled from 'styled-components';
import dayjs from 'dayjs';
import { useState } from 'react';

import { getMonthYearDetails } from 'lib/utils/monthYear';
import Icon from '../Button/Icon';
import { IconLeftArrow, IconRightArrow } from '@style/icons';

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid blue;
  padding: 0 1rem;
  height: 40px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

const Grid = styled.div`
  display: grid;
  border: 2px solid green;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
`;

const GridItemFirst = styled.div<{ gridColumnStart?: number }>`
  grid-column-start: ${({ gridColumnStart }) =>
    gridColumnStart ? gridColumnStart : null};
  border: 2px solid purple;
`;

export default function Index() {
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  return (
    <Container>
      <Header>
        <IconWrapper>
          <Icon icon={<IconLeftArrow />}>previous</Icon>
        </IconWrapper>
        {monthYear.year}년 {monthYear.month}월
        <IconWrapper>
          <Icon icon={<IconRightArrow />}>next</Icon>
        </IconWrapper>
      </Header>
      <Grid>
        <GridItemFirst gridColumnStart={monthYear.firstDOW + 1}>
          1
        </GridItemFirst>
        {[...Array(monthYear.lastDate)].map((_, i) =>
          i > 0 ? <GridItemFirst key={i}>{i + 1}</GridItemFirst> : null
        )}
      </Grid>
    </Container>
  );
}
