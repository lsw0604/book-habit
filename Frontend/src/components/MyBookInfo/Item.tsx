import styled from 'styled-components';
import { readToBookOptions } from 'lib/staticData';

interface IProps {
  status: BookStateType;
  start_date: string | null;
  end_date: string | null;
  rating: number | null;
  page: number | null;
  created_at: string | null;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding-left: 1rem;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.mode.typo_main};
  background-color: ${({ theme }) => theme.colors.sub};
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Line = styled.div`
  width: 0.2rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.main};
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 24px;
  width: 100%;
`;

const Description = styled.span`
  font-size: 14px;
`;

const Date = styled.span`
  display: flex;
  opacity: 0.6;
  font-size: 12px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

export default function Item({
  status,
  start_date,
  end_date,
  rating,
  page,
  created_at,
}: IProps) {
  if (status === '다읽음') {
    return (
      <Container>
        <div>{status}</div>
        <div>{start_date}</div>
        <div>{end_date}</div>
        <div>{rating}</div>
        <div>{created_at}</div>
      </Container>
    );
  }

  if (status === '읽는중') {
    return (
      <Container>
        <Line></Line>
        <div>{status}</div>
        <div>{start_date}</div>
        <div>{page}</div>
        <div>{created_at}</div>
      </Container>
    );
  }

  if (status === '읽고싶음' && rating && created_at) {
    const [year, month, day] = created_at.split('-');
    return (
      <Container>
        <Line />
        <Content>
          <Heading>{status}</Heading>
          <Date>
            {year}년 {month}월 {day}일
          </Date>
          <Description>
            "{readToBookOptions.filter((v) => v.value !== rating)[0].label}"
          </Description>
          <Description>라고 평가했어요.</Description>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Line />
      <Content>{status}</Content>
    </Container>
  );
}
