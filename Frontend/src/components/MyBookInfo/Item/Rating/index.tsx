import styled from 'styled-components';
import dayjs from 'dayjs';

import StarRating from 'components/StarRating/Rating';
import Icon from 'components/common/Button/Icon';
import { IconTrashCan } from '@style/icons';
import useMyBookRatingDeleteMutation from '@queries/myBook/useMyBookRatingDeleteMutation';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  display: inline-flex;
  width: 100%;
  gap: 8px;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
`;

const DateWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  width: 100%;
`;

const StatusWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 12px;
`;

export default function Index({
  created_at,
  rating,
  status,
  id,
}: MyBookPageQueriesRatingItemType) {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const { mutate } = useMyBookRatingDeleteMutation(
    parseInt(users_books_id),
    id
  );
  const [year, month, day] = dayjs(created_at)
    .add(9, 'hour')
    .toISOString()
    .split('T')[0]
    .split('-');

  return (
    <Container>
      <StatusWrapper>
        <DateWrapper>
          {year}
          {month}
          {day}
        </DateWrapper>
        {status}
      </StatusWrapper>
      <StarRating rating={rating} onChange={() => null} />
      <Icon icon={<IconTrashCan />} onClick={() => mutate(id)}>
        Delete
      </Icon>
    </Container>
  );
}
