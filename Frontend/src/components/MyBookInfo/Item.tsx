import styled from 'styled-components';
import dateParse from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';

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
  justify-content: space-between;
  gap: 8px;
`;

const Line = styled.div`
  width: 0.2rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.main};
`;

const Heading = styled.h1`
  display: flex;
  font-size: 14px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Description = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.mode.typo_sub};
  opacity: 0.6;
`;

const Date = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 24px;
  width: 100%;
`;

export default function Item({
  status,
  page,
  date,
  created_at,
  updated_at,
}: MyBookHistoryResponseType) {
  const [year, month, day] = addHours(dateParse(date), 9)
    .toISOString()
    .split('T')[0]
    .split('-');
  const [created_year, created_month, created_day] = addHours(
    dateParse(created_at),
    9
  )
    .toISOString()
    .split('T')[0]
    .split('-');

  const updatedArray = updated_at
    ? addHours(dateParse(updated_at), 9).toISOString().split('T')[0].split('-')
    : null;

  if (status === '다읽음') {
    return (
      <Container>
        <Line />
        <Content>
          <Date>
            {year}년 {month}월 {day}일
          </Date>
          <Heading>다 읽었어요.</Heading>
          <Description>
            {created_year}년 {created_month}월 {created_day}일 기록했어요.
          </Description>
          {updatedArray && (
            <Description>
              또 {updatedArray[0]}년 {updatedArray[1]}월 {updatedArray[2]}일
              수정했고요.
            </Description>
          )}
        </Content>
      </Container>
    );
  }

  if (status === '읽는중') {
    return (
      <Container>
        <Line />
        <Content>
          <Date>
            {year}년 {month}월 {day}일
          </Date>
          <Heading>{status}</Heading>
          {page && <Description>{page} 페이지 읽었어요.</Description>}
        </Content>
      </Container>
    );
  }

  if (status === '읽기시작함') {
    return (
      <Container>
        <Line />
        <Content>
          <Date>
            {year}년 {month}월 {day}일
          </Date>
          <Heading>읽기 시작했어요.</Heading>
          {page && <Description>{page} 페이지 읽었어요.</Description>}
          <Description>
            {created_year}년 {created_month}월 {created_day}일 기록했어요.
          </Description>
          {updatedArray && (
            <Description>
              또 {updatedArray[0]}년 {updatedArray[1]}월 {updatedArray[2]}일
              수정했고요.
            </Description>
          )}
        </Content>
      </Container>
    );
  }

  if (status === '읽고싶음') {
    return (
      <Container>
        <Line />
        <Content>
          <Date>
            {year}년 {month}월 {day}일
          </Date>
          <Heading>읽고 싶어요.</Heading>
          <Description>
            {created_year}년 {created_month}월 {created_day}일 기록했어요.
          </Description>
          {updatedArray && (
            <Description>
              또 {updatedArray[0]}년 {updatedArray[1]}월 {updatedArray[2]}일
              수정했고요.
            </Description>
          )}
        </Content>
      </Container>
    );
  }
}
