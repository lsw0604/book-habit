import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';

import RadioButton from 'components/common/Radio/RadioButton';
import { RadioGroupOptionType } from 'types/style';
import DateSelector from 'components/MyBookInfo/DateSelector';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import dayjs from 'dayjs';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Stack = styled.div<{ isStatus?: boolean }>`
  position: relative;
  width: 100%;
  ${({ isStatus }) =>
    isStatus
      ? css`
          display: flex;
          gap: 12px;
        `
      : null}
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const options: RadioGroupOptionType<string>[] = [
  {
    label: '읽기 시작한 날',
    value: '읽기시작함',
    description: '책을 읽기 시작했어요.',
  },
  {
    label: '읽은 날',
    value: '읽는중',
    description: '책을 읽었어요.',
  },
  {
    label: '다 읽은 날',
    value: '다읽음',
    description: '책을 다 읽었어요.',
  },
];

export default function History() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const {
    addFormDate,
    addFormStatus,
    addFormUseValidation,
    onChangeAddFormDate,
    onChangeAddFormStatus,
    onChangeAddFormStateInitial,
  } = useMyBookAddFormHook();

  const userBookId = parseInt(users_books_id);

  const { myBookTimeData } = useMyBookPageQueries(userBookId);

  const startDate = myBookTimeData?.startDate
    ? new Date(dayjs(myBookTimeData.startDate).add(9, 'hour').toISOString())
    : null;

  const endDate = myBookTimeData?.endDate
    ? new Date(dayjs(myBookTimeData.endDate).add(9, 'hour').toISOString())
    : null;

  useEffect(() => {
    onChangeAddFormStateInitial();
  }, []);

  return (
    <Container>
      <Stack>
        <RadioButton<string>
          options={options}
          value={addFormStatus}
          onChange={onChangeAddFormStatus}
          errorMessage="상태를 선택해주세요."
          isValid={addFormStatus === ''}
          useValidation={addFormUseValidation}
        />
      </Stack>
      <Content>
        <Stack>
          <DateSelector
            startDate={startDate}
            onChange={(e) => onChangeAddFormDate(e)}
            date={addFormDate}
            endDate={endDate}
            errorMessage="날짜를 입력해주세요."
            isValid={addFormDate === null}
            useValidation={addFormUseValidation}
          />
        </Stack>
      </Content>
    </Container>
  );
}
