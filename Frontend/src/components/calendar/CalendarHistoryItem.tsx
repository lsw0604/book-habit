import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Icon from 'components/common/Button/Icon';
import { IconTrashCan } from '@style/icons';
import { STATUS_WORD_OBJECT, STATUS_COLOR_OBJECT } from 'lib/staticData';
import { getCalendarDetail } from 'lib/utils/calendar';
import { calendarAtom } from 'recoil/calendar';
import { myBookAtom } from 'recoil/myBook';
import { modalAtom } from 'recoil/modal';

const Container = styled.div`
  display: inline-flex;
  padding: 0;
  margin: 0;
  width: 100%;
  cursor: pointer;
  min-height: 100%;
  scroll-snap-align: start;
`;

const DateContainer = styled.div`
  width: 12%;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.mode.typo_main};
  width: 100%;
  padding: 0 10px;
  display: inline-flex;
  flex-direction: row;
  gap: 0;
  align-items: center;
`;

const ContentMessage = styled.p`
  font-size: 12px;
`;

const ContentDate = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const Line = styled.div<{ status: HistoryStatusType }>`
  width: 0.3rem;
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

  const [year, month, day] = dayjs(date).format('YYYY-MM-DD').split('-');

  const setCalendarState = useSetRecoilState(calendarAtom);

  const [createdYear, createdMonth, createdDay] = dayjs(created_at)
    .format('YYYY-MM-DD')
    .split('-');

  const updatedAt = updated_at
    ? dayjs(updated_at).format('YYYY-MM-DD').split('-')
    : undefined;

  const deleteHandler = () => {
    onChangeUsersBooksId(users_books_id);
    onChangeHistoryId(id);
    onChangeModal('deleteHistory');
  };

  return (
    <Container>
      <DateContainer>
        {updatedAt ? (
          <>
            <p>{updatedAt[0]}</p>
            <p>
              {updatedAt[1]}/{updatedAt[2]}
            </p>
          </>
        ) : (
          <>
            <p>{createdYear}</p>
            <p>
              {createdMonth}/{createdDay}
            </p>
          </>
        )}
      </DateContainer>
      <Line status={status} />
      <Content
        onClick={() =>
          setCalendarState(getCalendarDetail(dayjs(`${year}-${month}`)))
        }
      >
        <ContentDate>
          {year}년 {month}월 {day}일&nbsp;
        </ContentDate>
        <ContentMessage>{STATUS_WORD_OBJECT[status]}</ContentMessage>
      </Content>
      <IconWrapper>
        <Icon icon={<IconTrashCan />} onClick={deleteHandler}>
          Delete
        </Icon>
      </IconWrapper>
    </Container>
  );
}
