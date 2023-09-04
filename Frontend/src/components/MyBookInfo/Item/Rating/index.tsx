import styled from 'styled-components';
import dayjs from 'dayjs';

import StarRating from 'components/StarRating/Rating';

interface IProps {
  created_at: string;
  status: '읽기전' | '다읽음' | '읽는중';
  rating: number;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 8px;
  justify-content: center;
  align-items: center;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 34px;
`;
const Date = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  width: 100%;
`;

const StatusWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 12px;
  width: 100%;
`;

export default function Index({ created_at, rating, status }: IProps) {
  const [year, month, day] = dayjs(created_at)
    .add(9, 'hour')
    .toISOString()
    .split('T')[0]
    .split('-');

  return (
    <Container>
      <StatusWrapper>{status}</StatusWrapper>
      <StarRating rating={rating} onChange={() => null} />
      <DateWrapper>
        <Date>{year}년</Date>
        <Date>{month}월</Date>
        <Date>{day}일</Date>
      </DateWrapper>
    </Container>
  );
}
