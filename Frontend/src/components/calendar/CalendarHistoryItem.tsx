import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Icon from 'components/common/Button/Icon';
import { IconPencil, IconTrashCan } from '@style/icons';
import { STATUS_WORD_OBJECT, STATUS_COLOR_OBJECT } from 'lib/staticData';
import { getCalendarDetail } from 'lib/utils/calendar';
import { calendarAtom } from 'recoil/calendar';
import { myBookAtom } from 'recoil/myBook';
import { modalAtom } from 'recoil/modal';

const Container = styled.li`
  width: 100%;
  height: 100%;
  display: inline-flex;
  cursor: pointer;
  scroll-snap-align: start;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.mode.typo_main};
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
`;

const HistoryStatusMessage = styled.span<{ status: HistoryStatusType }>`
  color: ${({ status }) => STATUS_COLOR_OBJECT[status]};
`;

const HistoryMessage = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const HistoryCreatedAt = styled.div`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ColorBadge = styled.div<{ status: HistoryStatusType }>`
  width: 1rem;
  border-radius: 8px 0 0 8px;
  height: auto;
  background-color: ${({ status }) => STATUS_COLOR_OBJECT[status]};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CalendarHistoryItem({
  id,
  status,
  date,
  created_at,
  updated_at,
  users_books_id,
}: MyBookPageQueriesHistoryItemType & {
  users_books_id: number;
}) {
  const setModalState = useSetRecoilState(modalAtom);
  const setMyBookState = useSetRecoilState(myBookAtom);

  const onChangeUsersBooksId = useCallback((users_books_id: number) => {
    setMyBookState((prev) => ({ ...prev, users_books_id }));
  }, []);

  const onChangeHistoryId = useCallback((history_id: number) => {
    setMyBookState((prev) => ({ ...prev, history_id }));
  }, []);

  const onChangeModal = useCallback((type: ModalAtomType['type']) => {
    setModalState({ isOpen: true, type });
  }, []);

  const setCalendarState = useSetRecoilState(calendarAtom);

  const [year, month, day] = dayjs(date).format('YYYY-MM-DD').split('-');
  const createdAtDate = dayjs(created_at).format('YYYY-MM-DD');
  const updatedAtDate = updated_at
    ? dayjs(updated_at).format('YYYY-MM-DD')
    : undefined;

  const deleteHandler = () => {
    onChangeUsersBooksId(users_books_id);
    onChangeHistoryId(id);
    onChangeModal('deleteHistory');
  };

  return (
    <Container>
      <ColorBadge status={status} />
      <Content
        onClick={() =>
          setCalendarState(getCalendarDetail(dayjs(`${year}-${month}`)))
        }
      >
        <HistoryMessage>
          {`${year}년 ${month}월 ${day}일`}&nbsp;
          <HistoryStatusMessage status={status}>
            {STATUS_WORD_OBJECT[status]}
          </HistoryStatusMessage>
        </HistoryMessage>
        <HistoryCreatedAt>
          {updatedAtDate ? <p>📅{updatedAtDate}</p> : <p>📅{createdAtDate}</p>}
        </HistoryCreatedAt>
      </Content>
      <IconWrapper>
        <Icon icon={<IconTrashCan />} onClick={deleteHandler}>
          Delete
        </Icon>
        <Icon icon={<IconPencil />}>Modify</Icon>
      </IconWrapper>
    </Container>
  );
}
