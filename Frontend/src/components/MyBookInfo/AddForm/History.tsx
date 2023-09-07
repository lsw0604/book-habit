import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';

import Input from 'components/common/Input';
import RadioButton from 'components/common/Radio/RadioButton';
import { IconBook } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';
import DateSelector from 'components/MyBookInfo/DateSelector';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookPageInfoHook from '@hooks/useMyBookPageInfoHook';

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

export default function History() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const {
    addFormDate,
    addFormStatus,
    addFormUseValidation,
    addFormPage,
    onChangeAddFormDate,
    onChangeAddFormStatus,
    onChangeAddFormPage,
    setAddFormState,
  } = useMyBookAddFormHook();

  const userBookId = parseInt(users_books_id);

  const { myBookTimeData } = useMyBookPageInfoHook(userBookId);

  useEffect(() => {
    setAddFormState({
      date: null,
      status: '',
      useValidation: false,
      page: '',
      rating: 0,
    });
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
        <Stack isStatus={addFormStatus === '읽는중'}>
          <Stack>
            <DateSelector
              startDate={myBookTimeData && new Date(myBookTimeData?.startDate)}
              onChange={(e) => onChangeAddFormDate(e)}
              date={addFormDate}
              endDate={
                myBookTimeData?.endDate
                  ? new Date(myBookTimeData.endDate)
                  : null
              }
              errorMessage="날짜를 입력해주세요."
              isValid={addFormDate === null}
              useValidation={addFormUseValidation}
            />
          </Stack>
          {addFormStatus === '읽는중' && (
            <Stack>
              <Input
                type="number"
                label="이정도 읽었어요."
                errorMessage="페이지를 입력해주세요."
                value={addFormPage}
                onChange={onChangeAddFormPage}
                useValidation={addFormUseValidation}
                isValid={addFormPage === 0 || addFormPage === ''}
              />
            </Stack>
          )}
        </Stack>
      </Content>
    </Container>
  );
}
