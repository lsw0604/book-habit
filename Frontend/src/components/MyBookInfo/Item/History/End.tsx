import styled from 'styled-components';
import dayjs from 'dayjs';

interface IProps {
  created_at: string;
  updated_at?: string;
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

export default function End({ created_at, updated_at }: IProps) {
  const created_date = dayjs(created_at)
    .add(9, 'hour')
    .toISOString()
    .split('T')[0];

  const updated_date = updated_at
    ? dayjs(updated_at).add(9, 'hour').toISOString().split('T')[0]
    : null;

  return (
    <Container>
      다 읽었어요.
      <DateContent>
        {updated_at ? <Date>{updated_date}</Date> : <Date>{created_date}</Date>}
      </DateContent>
    </Container>
  );
}
