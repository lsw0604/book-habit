import { useCallback } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { v4 } from 'uuid';

import { STATUS_COLOR_OBJECT } from 'lib/staticData';
import { modalAtom } from 'recoil/modal';
import { myBookAtom } from 'recoil/myBook';
import { customize } from '@style/colors';
import { IconClose } from '@style/icons';
import useToastHook from '@hooks/useToastHook';

const Container = styled.div<{ gridColumn?: number }>`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  padding-bottom: 100%;
  border-radius: 1rem;
  grid-column-start: ${({ gridColumn }) => gridColumn};
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  svg {
    fill: ${customize.slate['400']};
    height: 0.5rem;

    @media screen and (min-width: 1280px) {
      height: 1rem;
    }
  }
`;

const Status = styled.div<{ status: HistoryStatusType }>`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: ${({ status }) => STATUS_COLOR_OBJECT[status]};

  @media screen and (min-width: 1280px) {
    height: 1rem;
    width: 1rem;
  }
`;

const message = '해당 날짜는 선택하실 수 없습니다.';
const status: StatusType = 'error';

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

  const setMyBookState = useSetRecoilState(myBookAtom);
  const setModalState = useSetRecoilState(modalAtom);

  const dayObj = dayjs()
    .locale('ko')
    .year(parseInt(year))
    .month(parseInt(month) - 1)
    .date(date);

  const onChangeMyBookUsersBookId = useCallback((users_books_id: number) => {
    setMyBookState((prev) => ({ ...prev, users_books_id }));
  }, []);

  const onChangeMyBookDate = useCallback((date: Date | null) => {
    setMyBookState((prev) => ({ ...prev, date }));
  }, []);

  const onChangeModal = (type: ModalAtomType['type']) => {
    setModalState({ isOpen: true, type });
  };

  const { addToast } = useToastHook();

  const isSaturday = dayObj.day() === 6;
  const isSunday = dayObj.day() === 0;
  const dataMapped = data[dayObj.add(9, 'hour').toISOString().split('T')[0]];

  const startDateDayjs = startDate ? dayjs(startDate) : undefined;
  const endDateDayjs = endDate ? dayjs(endDate) : dayjs().add(-1, 'day');

  const isSelectDate: boolean =
    (startDateDayjs && dayObj.isBefore(startDateDayjs)) ||
    (endDateDayjs && dayObj.isAfter(endDateDayjs.add(1, 'day')));

  const historyRegisterModalHandler = () => {
    if (isSelectDate) return addToast({ message, status });

    onChangeMyBookUsersBookId(usersBooksId);
    onChangeMyBookDate(dayObj.toDate());
    onChangeModal('registerHistory');
  };

  return (
    <Container onClick={historyRegisterModalHandler} gridColumn={gridColumn}>
      <Contents>
        <Span isSaturday={isSaturday} isSunday={isSunday}>
          {date}
        </Span>
        <Wrapper>
          {isSelectDate ? (
            <IconClose />
          ) : (
            <>
              {dataMapped &&
                dataMapped.map((status) => (
                  <Status key={v4()} status={status} />
                ))}
            </>
          )}
        </Wrapper>
      </Contents>
    </Container>
  );
}
