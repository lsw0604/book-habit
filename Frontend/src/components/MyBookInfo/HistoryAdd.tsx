import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import dateParse from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';

import Input from 'components/common/Input';
import RadioButton from 'components/common/Radio/RadioButton';
import { IconBook } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';
import DateSelector from 'components/MyBookInfo/DateSelector';
import useMyBookAddFormHistoryHook from '@hooks/useMyBookAddFormHistoryHook';
import useMyBookHistoryHook from '@hooks/useMyBookHistoryHook';
import { useParams } from 'react-router-dom';

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
    label: '시작한 날',
    value: '읽기시작함',
    icon: <IconBook />,
    description: '책을 읽기 시작했어요.',
  },
  {
    label: '읽은 날',
    value: '읽는중',
    icon: <IconBook />,
    description: '책을 읽은 날이에요.',
  },
  {
    label: '다 끝난날',
    value: '다읽음',
    icon: <IconBook />,
    description: '책을 다 읽었어요.',
  },
];

export default function HistoryAdd() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const {
    addFormHistoryDate,
    addFormHistoryStatus,
    addFormHistoryUseValidation,
    addFormHistoryPage,
    onChangeAddFormHistoryDate,
    onChangeAddFormHistoryStatus,
    onChangeAddFormHistoryPage,
    setAddFormHistoryState,
  } = useMyBookAddFormHistoryHook();

  const { data: readToData } = useMyBookHistoryHook(parseInt(users_books_id), [
    '읽고싶음',
  ]);
  const { data: readStartData } = useMyBookHistoryHook(
    parseInt(users_books_id),
    ['읽기시작함']
  );
  const { data: readData } = useMyBookHistoryHook(parseInt(users_books_id), [
    '다읽음',
  ]);

  const getStartDate = (data?: MyBookHistoryResponseType[]) => {
    if (data && data.length !== 0) {
      return addHours(dateParse(data[0].date), 9);
    }
    return null;
  };

  useEffect(() => {
    setAddFormHistoryState({
      date: null,
      status: '',
      useValidation: false,
      page: '',
    });
  }, []);

  return (
    <Container>
      <Stack>
        <RadioButton<string>
          options={options}
          value={addFormHistoryStatus}
          onChange={onChangeAddFormHistoryStatus}
          errorMessage="상태를 선택해주세요."
          isValid={addFormHistoryStatus === ''}
          useValidation={addFormHistoryUseValidation}
        />
      </Stack>
      <Content>
        <Stack isStatus={addFormHistoryStatus === '읽는중'}>
          <Stack>
            <DateSelector
              startDate={
                getStartDate(readStartData)
                  ? getStartDate(readStartData)
                  : getStartDate(readToData)
              }
              onChange={(e) => onChangeAddFormHistoryDate(e)}
              date={addFormHistoryDate}
              endDate={
                readData
                  ? readData.length !== 0
                    ? addHours(dateParse(readData[0].date), 9)
                    : new Date()
                  : new Date()
              }
              errorMessage="날짜를 입력해주세요."
              isValid={addFormHistoryDate === null}
              useValidation={addFormHistoryUseValidation}
            />
          </Stack>
          {addFormHistoryStatus === '읽는중' && (
            <Stack>
              <Input
                type="number"
                label="이정도 읽었어요."
                errorMessage="페이지를 입력해주세요."
                value={addFormHistoryPage}
                onChange={onChangeAddFormHistoryPage}
                useValidation={addFormHistoryUseValidation}
                isValid={addFormHistoryPage === 0 || addFormHistoryPage === ''}
              />
            </Stack>
          )}
        </Stack>
      </Content>
    </Container>
  );
}
