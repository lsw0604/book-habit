import { useEffect } from 'react';
import styled, { css } from 'styled-components';

import Input from 'components/common/Input';
import RadioButton from 'components/common/Radio/RadioButton';
import { IconBook } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';
import DateSelector from 'components/MyBookInfo/DateSelector';
import useMyBookAddFormHistoryHook from '@hooks/useMyBookAddFormHistoryHook';

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
    label: '다 읽은 날',
    value: '다읽음',
    icon: <IconBook />,
    description: '책을 다 읽었어요.',
  },
];

export default function HistoryAdd() {
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
              onChange={(e) => onChangeAddFormHistoryDate(e)}
              date={addFormHistoryDate}
              endDate={new Date()}
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
