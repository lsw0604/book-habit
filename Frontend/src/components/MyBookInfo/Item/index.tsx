import styled from 'styled-components';
import dateParse from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';

import End from 'components/MyBookInfo/Item/End';
import Reading from 'components/MyBookInfo/Item/Reading';
import Start from 'components/MyBookInfo/Item/Start';
import ReadTo from 'components/MyBookInfo/Item/ReadTo';

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

  // if (status === '읽고싶음') {
  //   return (
  //     <Container>
  //       <Line />
  //       <Content>
  //         <Date>
  //           {year}년 {month}월 {day}일
  //         </Date>
  //         <Heading>읽고 싶어요.</Heading>
  //         <Description>
  //           {created_year}년 {created_month}월 {created_day}일 기록했어요.
  //         </Description>
  //         {updatedArray && (
  //           <Description>
  //             또 {updatedArray[0]}년 {updatedArray[1]}월 {updatedArray[2]}일
  //             수정했고요.
  //           </Description>
  //         )}
  //       </Content>
  //     </Container>
  //   );
  // }

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
