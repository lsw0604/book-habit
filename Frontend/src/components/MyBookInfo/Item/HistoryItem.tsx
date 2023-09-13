import styled from 'styled-components';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Icon from 'components/common/Button/Icon';
import { IconTrashCan } from '@style/icons';
import useMyBookHistoryDeleteMutation from '@queries/myBook/useMyBookHistoryDeleteMutation';
import { StatusWordObj, StatusColorObj } from 'lib/staticData';
import useToastHook from '@hooks/useToastHook';

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

  const { addToast } = useToastHook();

  const { mutate, isLoading, isSuccess, data, isError, error } =
    useMyBookHistoryDeleteMutation(id, parseInt(users_books_id));

  const [year, month, day] = dayjs(date)
    .add(9, 'hour')
    .toISOString()
    .split('T')[0]
    .split('-');

  const [createdYear, createdMonth, createdDay] = dayjs(created_at)
    .add(9, 'hour')
    .toISOString()
    .split('T')[0]
    .split('-');

  const updatedAt = updated_at
    ? dayjs(updated_at).add(9, 'hour').toISOString().split('T')[0].split('-')
    : undefined;

  useEffect(() => {
    console.log('HistoryItem', data);
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

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
        <Icon
          isLoading={isLoading}
          icon={<IconTrashCan />}
          onClick={() => mutate(id)}
        >
          Delete
        </Icon>
      </IconWrapper>
    </Container>
  );
}
