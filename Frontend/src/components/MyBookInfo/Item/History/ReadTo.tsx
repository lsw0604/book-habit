import styled from 'styled-components';
import dayjs from 'dayjs';

interface IProps {
  created_at: string;
  updated_at: string | null;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateContent = styled.div`
  display: flex;
`;

const Date = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 8px;
  line-height: 12px;
  width: 100%;
`;

export default function ReadTo({ created_at, updated_at }: IProps) {
  const created_date = dayjs(created_at)
    .add(9, 'hour')
    .toISOString()
    .split('T')[0];

  const updated_date = updated_at
    ? dayjs(updated_at).add(9, 'hour').toISOString().split('T')[0]
    : null;
  return (
    <Container>
      이 날 찜했어요.
      <DateContent>
        {updated_at ? <Date>{updated_date}</Date> : <Date>{created_date}</Date>}
      </DateContent>
    </Container>
  );
}
