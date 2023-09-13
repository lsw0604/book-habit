import dayjs from 'dayjs';
import styled from 'styled-components';
import { customize } from '@style/colors';
import { StatusColorObj } from 'lib/staticData';

interface IProps {
  gridColumn?: number;
  date?: number;
  year?: string;
  month?: string;
  data: { [date: string]: HistoryStatusType[] };
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
  flex-direction: row;
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
  top: 10;
  left: 10;
  color: ${({ theme }) => theme.mode.typo_main};
  color: ${({ isSunday }) => (isSunday ? customize.red['400'] : null)};
  color: ${({ isSaturday }) => (isSaturday ? customize.sky['400'] : null)};
`;

const StatusWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
`;

const Status = styled.div<{ status: HistoryStatusType }>`
  width: 20%;
  height: 20%;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: ${({ status }) => StatusColorObj[status]};
`;

export default function DateBox({
  gridColumn,
  date,
  month,
  year,
  data,
}: IProps) {
  if (!year || !month || !date) return null;

  const dayObj = dayjs()
    .locale('kr')
    .year(parseInt(year))
    .month(parseInt(month) - 1)
    .date(date);

  const isSaturday = dayObj.day() === 6;
  const isSunday = dayObj.day() === 0;
  const dataMapped = data[dayObj.add(9, 'hour').toISOString().split('T')[0]];

  return (
    <Container gridColumn={gridColumn}>
      <Contents>
        <Span isSaturday={isSaturday} isSunday={isSunday}>
          {date}
        </Span>
        <StatusWrapper>
          {dataMapped &&
            dataMapped.map((status, index) => (
              <Status key={index} status={status} />
            ))}
        </StatusWrapper>
      </Contents>
    </Container>
  );
}
