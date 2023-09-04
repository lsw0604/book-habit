import styled from 'styled-components';
import dayjs from 'dayjs';

interface IProps {
  created_at: string;
  updated_at?: string;
  page: number;
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
  font-size: 10px;
  line-height: 14px;
  width: 100%;
`;

export default function Reading({ created_at, updated_at, page }: IProps) {
  const created_date = dayjs(created_at)
    .add(9, 'hour')
    .toISOString()
    .split('T')[0];

  const updated_date = updated_at
    ? dayjs(updated_at).add(9, 'hour').toISOString().split('T')[0]
    : null;

  return (
    <Container>
      {page} 페이지 더 읽었어요.
      <DateContent>
        {updated_at ? <Date>{updated_date}</Date> : <Date>{created_date}</Date>}
      </DateContent>
    </Container>
  );
}
