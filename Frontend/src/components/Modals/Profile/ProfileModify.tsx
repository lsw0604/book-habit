import Button from 'components/common/Button';
import CheckBoxGroup from 'components/common/CheckBox';
import Input from 'components/common/Input';
import styled from 'styled-components';
import { CheckBoxOptionType, RadioGroupOptionType } from 'types/style';
import { ChangeEvent, useCallback, useState } from 'react';
import RadioGroup from 'components/common/Radio';
import { IconFemale, IconMale } from '@style/icons';

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
`;

const Stack = styled.div`
  margin-bottom: 8px;
`;

const Footer = styled.div`
  position: relative;
`;

const checkboxOptions: CheckBoxOptionType<string>[] = [
  {
    title: '이름',
    description: '이름을 수정하시려면 선택해주세요',
  },
  {
    title: '나이',
    description: '나이를 수정하시려면 선택해주세요',
  },
  {
    title: '성별',
    description: '성별을 수정하시려면 선택해주세요',
  },
];

const radioOptions: RadioGroupOptionType<'male' | 'female' | ''>[] = [
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
  const [value, setValue] = useState<CheckBoxOptionType<string>[]>([]);

  const [gender, setGender] = useState<GenderType | undefined>('');
  const [age, setAge] = useState<'' | number>('');
  const [name, setName] = useState<string>('');

  const onChange = (selected: CheckBoxOptionType<string>[]) => {
    setValue(selected);
  };

  const onChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [name, setName]
  );

  const onChangeGender = (ctx?: GenderType) => {
    setGender(ctx);
  };

  const onChangeAge = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const isValid = /^\d+$/.test(value);

      if (!isValid) return setAge('');

      setAge(parseInt(value, 10));
    },
    [age, setAge]
  );

  return (
    <Container>
      <Header>프로필 수정하시겠습니까?</Header>
      <Stack>
        <CheckBoxGroup<string>
          options={checkboxOptions}
          onChange={onChange}
          value={value}
        />
      </Stack>
      <Content>
        {value.some((el) => el.title === '이름') && (
          <Stack>
            <Input label="이름" value={name} onChange={onChangeName} />
          </Stack>
        )}
        {value.some((el) => el.title === '나이') && (
          <Stack>
            <Input label="나이" value={age} onChange={onChangeAge} />
          </Stack>
        )}
        {value.some((el) => el.title === '성별') && (
          <Stack>
            <RadioGroup<string>
              onChange={() => onChangeGender()}
              options={radioOptions}
              label="성별"
              value={gender as string}
            />
          </Stack>
        )}
      </Content>
      <Footer>
        <Button>수정하기</Button>
      </Footer>
    </Container>
  );
}
