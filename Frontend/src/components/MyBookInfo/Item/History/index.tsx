import styled from 'styled-components';
import dateParse from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';

import End from 'components/MyBookInfo/Item/History/End';
import Reading from 'components/MyBookInfo/Item/History/Reading';
import Start from 'components/MyBookInfo/Item/History/Start';
import ReadTo from 'components/MyBookInfo/Item/History/ReadTo';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0;
`;

const DateContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 34px;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.mode.typo_main};
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
  width: 0.3rem;
  background-color: ${({ theme }) => theme.colors.main};
`;

const Date = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  width: 100%;
`;

export default function Index({
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

  return (
    <Container>
      <DateContent>
        <Date>{year}년</Date>
        <Date>{month}월</Date>
        <Date>{day}일</Date>
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
    </Container>
  );
}
