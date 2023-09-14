import styled from 'styled-components';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import Icon from 'components/common/Button/Icon';
import { IconTrashCan } from '@style/icons';
import { StatusWordObj, StatusColorObj } from 'lib/staticData';
import useModalHook from '@hooks/useModalHook';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';

const Container = styled.div`
  display: inline-flex;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 40px;
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
  background-color: ${({ status }) => StatusColorObj[status]};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HistoryItem({
  id,
  status,
  date,
  created_at,
  updated_at,
}: MyBookPageQueriesHistoryItemType) {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const { setModalState } = useModalHook();
  const { onChangeAddFormUsersBooksId, onChangeAddFormHistoryId } =
    useMyBookAddFormHook();

  const [year, month, day] = dayjs(date).format('YYYY-MM-DD').split('-');

  const [createdYear, createdMonth, createdDay] = dayjs(created_at)
    .format('YYYY-MM-DD')
    .split('-');

  const updatedAt = updated_at
    ? dayjs(updated_at).format('YYYY-MM-DD').split('-')
    : undefined;

  const deleteHandler = () => {
    onChangeAddFormHistoryId(id);
    onChangeAddFormUsersBooksId(parseInt(users_books_id));
    setModalState({ isOpen: true, type: 'deleteHistory' });
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
      <Content>
        <ContentDate>
          {year}년 {month}월 {day}일&nbsp;
        </ContentDate>
        <ContentMessage>{StatusWordObj[status]}</ContentMessage>
      </Content>
      <IconWrapper>
        <Icon icon={<IconTrashCan />} onClick={deleteHandler}>
          Delete
        </Icon>
      </IconWrapper>
    </Container>
  );
}
