import { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import RadioButton from 'components/common/Radio/RadioButton';
import { RadioGroupOptionType } from 'types/style';
import DateSelector from 'components/MyBookInfo/DateSelector';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Stack = styled.div<{ isStatus?: boolean }>`
  position: relative;
  width: 100%;
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
  const {
    myBookDate,
    myBookStatus,
    myBookUseValidation,
    myBookUsersBooksId,
    onChangeMyBookDate,
    onChangeMyBookStatus,
    setMyBookState,
  } = useMyBookHook();

  const { myBookTimeData } = useMyBookPageQueries(myBookUsersBooksId as number);

  const startDate = myBookTimeData?.startDate
    ? new Date(dayjs(myBookTimeData.startDate).add(9, 'hour').toISOString())
    : null;

  const endDate = myBookTimeData?.endDate
    ? new Date(dayjs(myBookTimeData.endDate).add(9, 'hour').toISOString())
    : null;

  useEffect(() => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      comment: '',
      comment_id: undefined,
      rating: 0,
      status: '',
      useValidation: false,
    }));
  }, []);

  return (
    <Container>
      <Stack>
        <RadioButton<string>
          label="독서 기록 상태를 선택해주세요."
          options={options}
          value={myBookStatus}
          onChange={onChangeMyBookStatus}
          errorMessage="상태를 선택해주세요."
          isValid={myBookStatus === ''}
          useValidation={myBookUseValidation}
        />
      </Stack>
      <Content>
        <Stack>
          <DateSelector
            startDate={startDate}
            onChange={(e) => onChangeMyBookDate(e)}
            date={myBookDate}
            endDate={endDate}
            errorMessage="날짜를 입력해주세요."
            isValid={myBookDate === null}
            useValidation={myBookUseValidation}
          />
        </Stack>
      </Content>
    </Container>
  );
}
