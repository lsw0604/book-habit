import styled from 'styled-components';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import End from 'components/MyBookInfo/Item/History/End';
import Reading from 'components/MyBookInfo/Item/History/Reading';
import Start from 'components/MyBookInfo/Item/History/Start';
import ReadTo from 'components/MyBookInfo/Item/History/ReadTo';
import Icon from 'components/common/Button/Icon';
import { IconTrashCan } from '@style/icons';
import useMyBookHistoryDeleteMutation from '@queries/myBook/useMyBookHistoryDeleteMutation';

const Container = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 0;
  width: 100%;
`;

const DateContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.mode.typo_main};
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  margin: 1px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const Line = styled.div`
  width: 0.3rem;
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

  return (
    <Container>
      <DateContent>
        {year}년{month}월{day}일
      </DateContent>
      <Line />
      <Content>
        {status === '다읽음' && (
          <End created_at={created_at} updated_at={updated_at} />
        )}
        {status === '읽는중' && (
          <Reading
            created_at={created_at}
            updated_at={updated_at}
            page={page as number}
          />
        )}
        {status === '읽기시작함' && (
          <Start created_at={created_at} updated_at={updated_at} />
        )}
        {status === '읽고싶음' && (
          <ReadTo created_at={created_at} updated_at={updated_at} />
        )}
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
