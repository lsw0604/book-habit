import Button from 'components/common/Button';
import CheckBoxGroup from 'components/common/CheckBox';
import Input from 'components/common/Input';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
import styled from 'styled-components';
import { CheckBoxOptionType, RadioGroupOptionType } from 'types/style';
import { useState } from 'react';
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
  const [userState, setUserState] = useRecoilState(userAtom);
  const [value, setValue] = useState<CheckBoxOptionType<string>[]>([]);

  const onChange = (selected: CheckBoxOptionType<string>[]) => {
    setValue(selected);
  };

  return (
    <Container>
      <Header>프로필 수정하시겠습니까?</Header>
      <CheckBoxGroup<string>
        options={checkboxOptions}
        onChange={onChange}
        value={value}
      />
      <Content>
        {value.some((el) => el.title === '이름') && (
          <Input
            label="이름"
            value={userState.name}
            onChange={(e) =>
              setUserState((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        )}
        {value.some((el) => el.title === '나이') && (
          <Input
            label="나이"
            value={userState.age}
            onChange={(e) =>
              setUserState((prev) => ({
                ...prev,
                age: parseInt(e.target.value),
              }))
            }
          />
        )}
        {value.some((el) => el.title === '성별') && (
          <RadioGroup
            onChange={(e) =>
              setUserState((prev) => ({ ...prev, gender: e.target.value }))
            }
            options={radioOptions}
            label="성별"
            value={userState.gender as GenderType}
          />
        )}
      </Content>
      <Footer>
        <Button>수정하기</Button>
      </Footer>
    </Container>
  );
}
