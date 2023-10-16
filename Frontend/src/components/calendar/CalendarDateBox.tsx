import dayjs from 'dayjs';
import styled from 'styled-components';
import { customize } from '@style/colors';
import { StatusColorObj } from 'lib/staticData';
import useModalHook from '@hooks/useModalHook';
import useMyBookHook from '@hooks/useMyBookHook';
import useToastHook from '@hooks/useToastHook';
import { IconClose } from '@style/icons';
import { v4 } from 'uuid';

const Container = styled.div<{ gridColumn?: number }>`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
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
  top: 5px;
  left: 5px;

  color: ${({ theme }) => theme.mode.typo_main};
  color: ${({ isSunday }) => (isSunday ? customize.red['400'] : null)};
  color: ${({ isSaturday }) => (isSaturday ? customize.sky['400'] : null)};
`;

const StatusWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Status = styled.div<{ status: HistoryStatusType }>`
  width: 20%;
  height: 20%;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: ${({ status }) => StatusColorObj[status]};
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  svg {
    height: 30%;
    fill: ${customize.slate['400']};
  }
`;

export default function DateBox({
  gridColumn,
  date,
  month,
  year,
  data,
  usersBooksId,
  startDate,
  endDate,
}: DateBoxType) {
  if (!year || !month || !date) return null;

  const dayObj = dayjs()
    .locale('ko')
    .year(parseInt(year))
    .month(parseInt(month) - 1)
    .date(date);

  const { setModalState } = useModalHook();
  const { onChangeMyBookUsersBooksId, onChangeMyBookDate } = useMyBookHook();
  const { addToast } = useToastHook();

  const isSaturday = dayObj.day() === 6;
  const isSunday = dayObj.day() === 0;
  const dataMapped = data[dayObj.add(9, 'hour').toISOString().split('T')[0]];

  const startDateDayjs = startDate ? dayjs(startDate) : undefined;
  const endDateDayjs = endDate ? dayjs(endDate) : dayjs().add(-1, 'day');

  const historyRegisterModalHandler = () => {
    if (
      (startDateDayjs && dayObj.isBefore(startDateDayjs)) ||
      (endDateDayjs && dayObj.isAfter(endDateDayjs.add(1, 'day')))
    ) {
      addToast({
        message: '해당 날짜는 선택하실 수 없습니다.',
        status: 'error',
      });
      return;
    }
    onChangeMyBookUsersBooksId(usersBooksId);
    onChangeMyBookDate(dayObj.toDate());
    setModalState({ isOpen: true, type: 'registerHistory' });
  };

  return (
    <Container onClick={historyRegisterModalHandler} gridColumn={gridColumn}>
      <Contents>
        <Span isSaturday={isSaturday} isSunday={isSunday}>
          {date}
        </Span>
        {(startDateDayjs && dayObj.isBefore(startDateDayjs)) ||
        (endDateDayjs && dayObj.isAfter(endDateDayjs.add(1, 'day'))) ? (
          <IconWrapper>
            <IconClose />
          </IconWrapper>
        ) : (
          <StatusWrapper>
            {dataMapped &&
              dataMapped.map((status) => <Status key={v4()} status={status} />)}
          </StatusWrapper>
        )}
      </Contents>
    </Container>
  );
}
