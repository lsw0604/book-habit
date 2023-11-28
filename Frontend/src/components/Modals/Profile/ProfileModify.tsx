import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import CheckBoxGroup from 'components/common/CheckBox';
import RadioGroup from 'components/common/Radio';

import { CheckBoxOptionType, RadioGroupOptionType } from 'types/style';
import {
  IconFemale,
  IconMale,
  IconNumber,
  IconPencil,
  IconPerson,
} from '@style/icons';
import useToastHook from '@hooks/useToastHook';
import useProfileInfoEditMutation from '@queries/profile/useProfileInfoEditMutation';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  svg {
    height: 50%;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const Content = styled.div`
  position: relative;
  margin-bottom: 1rem;

  .horizon {
    display: flex;
    gap: 1rem;
  }
`;

const Stack = styled.div`
  margin-bottom: 8px;
`;

const Footer = styled.div`
  position: relative;
`;

const CHECKBOX_OPTIONS: CheckBoxOptionType<string>[] = [
  {
    title: '이름을 수정할게요.',
    description: '이름을 수정하시려면 선택해주세요',
  },
  {
    title: '나이를 수정할게요.',
    description: '나이를 수정하시려면 선택해주세요',
  },
  {
    title: '성별을 수정할게요.',
    description: '성별을 수정하시려면 선택해주세요',
  },
];

const RADIO_OPTIONS: RadioGroupOptionType<'male' | 'female' | ''>[] = [
  {
    label: '남자',
    icon: <IconMale />,
    value: 'male',
    description: 'male',
  },
  {
    label: '여자',
    icon: <IconFemale />,
    value: 'female',
    description: 'female',
  },
];

export default function ProfileModify() {
  const { addToast } = useToastHook();
  const { mutate, isLoading } = useProfileInfoEditMutation();
  const [selectedOptions, setSelectedOptions] = useState<
    CheckBoxOptionType<string>[]
  >([]);

  const [useValidation, setUseValidation] = useState<boolean>(false);

  const [gender, setGender] = useState<GenderType | undefined>('');
  const [age, setAge] = useState<'' | number>('');
  const [name, setName] = useState<string>('');

  const hasSelectedOptionName = selectedOptions.some(
    (el) => el.title === '이름을 수정할게요.'
  );
  const hasSelectedOptionAge = selectedOptions.some(
    (el) => el.title === '나이를 수정할게요.'
  );
  const hasSelectedOptionGender = selectedOptions.some(
    (el) => el.title === '성별을 수정할게요.'
  );

  const onChangeCheckbox = useCallback(
    (selected: CheckBoxOptionType<string>[]) => {
      setSelectedOptions(selected);
    },
    []
  );

  const onChangeGender = useCallback((gender: GenderType) => {
    setGender(gender);
  }, []);

  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const onChangeAge = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = /^\d+$/.test(value);

    if (!isValid) return setAge('');

    setAge(parseInt(value, 10));
  }, []);

  const modifyObj: ProfileInfoEditMutationRequestType = {
    age,
    name,
    gender,
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);

    if (selectedOptions.length === 0) {
      return addToast({
        message: '수정할 항목을 선택해주세요.',
        status: 'info',
      });
    }

    if (
      (hasSelectedOptionName && name === '') ||
      (hasSelectedOptionAge && age === '') ||
      (hasSelectedOptionGender && gender === '')
    ) {
      return addToast({ message: '빈칸을 채워주세요.', status: 'info' });
    }

    setUseValidation(false);
    mutate(modifyObj);
  };

  useEffect(() => {
    if (!hasSelectedOptionName) setName('');
    if (!hasSelectedOptionAge) setAge('');
    if (!hasSelectedOptionGender) setGender('');

    setUseValidation(false);
  }, [selectedOptions]);

  return (
    <Container onSubmit={onSubmit}>
      <Header>프로필 수정하기</Header>
      <Stack>
        <CheckBoxGroup<string>
          options={CHECKBOX_OPTIONS}
          onChange={onChangeCheckbox}
          value={selectedOptions}
          isValid={selectedOptions.length === 0}
          useValidation={useValidation}
          errorMessage="수정할 항목을 선택해주세요."
        />
      </Stack>
      <Content>
        <div
          className={
            hasSelectedOptionName && hasSelectedOptionAge ? 'horizon' : ''
          }
        >
          {hasSelectedOptionName && (
            <Stack>
              <Input
                icon={<IconPerson />}
                label="이름"
                value={name}
                onChange={onChangeName}
                isValid={name === ''}
                useValidation={useValidation}
                errorMessage="이름을 입력해주세요."
              />
            </Stack>
          )}
          {hasSelectedOptionAge && (
            <Stack>
              <Input
                icon={<IconNumber />}
                label="나이"
                value={age}
                onChange={onChangeAge}
                isValid={age === ''}
                useValidation={useValidation}
                errorMessage="나이를 입력해주세요."
              />
            </Stack>
          )}
        </div>
        {hasSelectedOptionGender && (
          <Stack>
            <RadioGroup<string>
              onChange={(e) => onChangeGender(e as GenderType)}
              options={RADIO_OPTIONS}
              label="성별"
              value={gender as string}
              isValid={gender === ''}
              useValidation={useValidation}
              errorMessage="성별을 입력해주세요."
            />
          </Stack>
        )}
      </Content>
      <Footer>
        <Button isLoading={isLoading} icon={<IconPencil />}>
          수정하기
        </Button>
      </Footer>
    </Container>
  );
}
