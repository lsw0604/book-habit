import styled from 'styled-components';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import Icon from 'components/common/Button/Icon';
import { IconTrashCan } from '@style/icons';
import useMyBookHistoryDeleteMutation from '@queries/myBook/useMyBookHistoryDeleteMutation';

const Container = styled.div`
  display: inline-flex;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 40px;
`;

const DateContainer = styled.div`
  width: 18%;
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

const Line = styled.div`
  width: 0.3rem;
  height: auto;
  background-color: ${({ theme }) => theme.colors.main};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Index({
  id,
  status,
  page,
  date,
  created_at,
  updated_at,
}: MyBookPageQueriesHistoryItemType) {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const { mutate, isLoading } = useMyBookHistoryDeleteMutation(
    id,
    parseInt(users_books_id)
  );
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

  const statusHandler = (
    status: '읽기시작함' | '다읽음' | '읽고싶음' | '읽는중'
  ) => {
    switch (status) {
      case '읽기시작함':
        return '읽기 시작했어요.';
      case '다읽음':
        return '다 읽었어요.';
      case '읽고싶음':
        return '읽고싶은 책 목록에 찜했어요.';
      case '읽는중':
        return '읽었어요.';
      default:
        return '';
    }
  };

  return (
    <Container>
      <DateContainer>
        {updatedAt ? (
          <>
            <p>{updatedAt[0]}년</p>
            <p>
              {updatedAt[1]}월 {updatedAt[2]}일
            </p>
          </>
        ) : (
          <>
            <p>{createdYear}년</p>
            <p>
              {createdMonth}월 {createdDay}일
            </p>
          </>
        )}
      </DateContainer>
      <Line />
      <Content>
        <ContentDate>
          {year}년 {month}월 {day}일&nbsp;
        </ContentDate>
        <ContentMessage>{statusHandler(status)}</ContentMessage>
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
