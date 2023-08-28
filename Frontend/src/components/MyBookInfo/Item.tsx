import styled from 'styled-components';
import { readToBookOptions, ratingList } from 'lib/staticData';
import dateParse from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';

interface IProps {
  status: BookStateType;
  start_date: string | null;
  end_date: string | null;
  rating: number | null;
  page: number | null;
  created_at: string | null;
  updated_at: string | null;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
`;

const Content = styled.div`
  min-height: 108px;
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
  updated_at,
}: IProps) {
  const createdAt = created_at
    ? addHours(dateParse(created_at), 9).toISOString().split('T')[0]
    : created_at;
  const startDate = start_date
    ? addHours(dateParse(start_date), 9).toISOString().split('T')[0]
    : start_date;
  const endDate = end_date
    ? addHours(dateParse(end_date), 9).toISOString().split('T')[0]
    : end_date;
  const updatedAt = updated_at
    ? addHours(dateParse(updated_at), 9).toISOString().split('T')[0]
    : updated_at;

  if (status === '다읽음' && rating && createdAt && startDate && endDate) {
    const [created_year, created_month, created_day] = createdAt.split('-');
    const [start_year, start_month, start_day] = startDate.split('-');
    const [end_year, end_month, end_day] = endDate.split('-');

    return (
      <>
        <Container>
          <Line />
          <Content>
            <Heading>{status}</Heading>
            <Date>
              {created_year}년 {created_month}월 {created_day}일
            </Date>
            <Description>"{ratingList[rating]}"</Description>
            {end_year}년 {end_month}월 {end_day}일 다 읽었어요.
          </Content>
        </Container>
        <Container>
          <Line />
          <Content>
            <Heading>{status}</Heading>
            <Date>
              {created_year}년 {created_month}월 {created_day}일
            </Date>
            {start_year}년 {start_month}월 {start_day}일 읽기 시작해서{' '}
          </Content>
        </Container>
      </>
    );
  }

  if (status === '읽는중' && page && createdAt && startDate) {
    const [year, month, day] = createdAt.split('-');
    const [start_year, start_month, start_day] = startDate.split('-');
    return (
      <Container>
        <Line />
        <Content>
          <Heading>{status}</Heading>
          <Date>
            {year}년 {month}월 {day}일
          </Date>
          <Description>
            {start_year}년 {start_month}월 {start_day}일 부터 읽기 시작해서{' '}
          </Description>
          <Description>{page} 페이지 읽었어요.</Description>
        </Content>
      </Container>
    );
  }

  if (status === '읽고싶음' && rating && createdAt) {
    const [year, month, day] = createdAt.split('-');
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
}
