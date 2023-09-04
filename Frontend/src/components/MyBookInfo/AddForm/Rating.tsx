import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import RadioButton from 'components/common/Radio/RadioButton';
import styled from 'styled-components';
import { RadioGroupOptionType } from 'types/style';
import StarRating from 'components/StarRating/Rating';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
`;

const options: RadioGroupOptionType<string>[] = [
  {
    label: '읽기전',
    value: '읽기전',
    description: '이 정도 기대하고있어요',
  },
  {
    label: '읽는중',
    value: '읽는중',
    description: '이 정도 기대하는중이에요',
  },
  {
    label: '다읽음',
    value: '다읽음',
    description: '이 정도 추천해요',
  },
];

export default function Rating() {
  const {
    addFormStatus,
    addFromRating,
    onChangeAddFormStatus,
    onChangeAddFormRating,
    useMyBookAddFromRatingValidation,
  } = useMyBookAddFormHook();

  return (
    <Container>
      <Stack>
        <RadioButton<string>
          options={options}
          value={addFormStatus}
          onChange={onChangeAddFormStatus}
          errorMessage="상태를 선택해주세요."
          isValid={addFormStatus === ''}
          useValidation={useMyBookAddFromRatingValidation}
        />
      </Stack>
      <Stack>
        <StarRating rating={addFromRating} onChange={onChangeAddFormRating} />
      </Stack>
    </Container>
  );
}
