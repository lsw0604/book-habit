import dayjs from 'dayjs';
import styled from 'styled-components';
import { customize } from '@style/colors';

interface IProps {
  gridColumn?: number;
  date?: number;
  year?: string;
  month?: string;
  data: { [date: string]: string };
}

const Container = styled.div<{ gridColumn?: number }>`
  width: 100%;
  height: 100%;
  position: relative;
  grid-column-start: ${({ gridColumn }) => gridColumn};
  padding-bottom: 100%;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  padding: 4px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Span = styled.span<{ isSunday?: boolean; isSaturday?: boolean }>`
  font-size: 14px;
  position: absolute;
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.mode.typo_main};
  color: ${({ isSunday }) => (isSunday ? customize.red['400'] : null)};
  color: ${({ isSaturday }) => (isSaturday ? customize.sky['400'] : null)};
`;

const StatusWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
`;

const StatusCircle = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.spinner};
`;

export default function DateBox({
  gridColumn,
  date,
  month,
  year,
  data,
}: IProps) {
  if (year && month && date) {
    const dayObj = dayjs()
      .locale('kr')
      .year(parseInt(year))
      .month(parseInt(month) - 1)
      .date(date);

    const isSaturday = dayObj.day() === 6;
    const isSunday = dayObj.day() === 0;
    const dataMapped = data[dayObj.add(9, 'hour').toISOString().split('T')[0]];

    if (dataMapped !== undefined) {
      return (
        <Container gridColumn={gridColumn}>
          <Contents>
            <Span isSaturday={isSaturday} isSunday={isSunday}>
              {date}
            </Span>
            <StatusWrapper>{dataMapped && <StatusCircle />}</StatusWrapper>
          </Contents>
        </Container>
      );
    }
    return (
      <Container gridColumn={gridColumn}>
        <Contents>
          <Span isSaturday={isSaturday} isSunday={isSunday}>
            {date}
          </Span>
        </Contents>
      </Container>
    );
  }
}
