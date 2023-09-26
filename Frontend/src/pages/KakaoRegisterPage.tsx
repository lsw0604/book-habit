import styled from 'styled-components';
import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import RadioGroup from 'components/common/Radio';
import useKakaoSignUpMutation from '@queries/kakao/useKakaoSignUpMutation';
import { IconFemale, IconMale, IconNumber, IconPerson } from '@style/icons';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KakaoRegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 375px;
  width: 100%;
  height: auto;
  @media screen and (min-width: 1280px) {
    max-width: 500px;
    padding: 2rem;
    box-shadow: ${({ theme }) => theme.shadow.lg};
    border-radius: 10px;
  }
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Header = styled.h1`
  margin-bottom: 16px;
  text-align: center;
  font-size: 28px;
  line-height: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.sub};
`;

export default function KakaoRegisterPage() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | ''>('');
  const [age, setAge] = useState<number | ''>('');

  const [useValidation, setUseValidation] = useState(false);
  const { mutate, isLoading } = useKakaoSignUpMutation();

  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const onChangeGender = (ctx: 'male' | 'female' | '') => {
    setGender(ctx);
  };

  const onChangeAge = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = /^\d+$/.test(value);

    if (isValid) {
      setAge(parseInt(value, 10));
    } else {
      setAge('');
    }
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);
    if (age && name && gender) {
      mutate({ age, gender, name });
    }
  };

  useEffect(() => {
    return () => {
      setUseValidation(false);
    };
  }, []);

  return (
    <Container>
      <KakaoRegisterForm onSubmit={onSubmit}>
        <Header>추가 정보 입력</Header>
        <Stack>
          <Input
            icon={<IconPerson />}
            label="이름"
            type="text"
            value={name}
            onChange={onChangeName}
            useValidation={useValidation}
            isValid={!name}
            errorMessage="이름을 입력해주세요."
          />
        </Stack>
        <Stack>
          <Input
            type="number"
            label="나이"
            errorMessage="나이를 입력해주세요."
            icon={<IconNumber />}
            isValid={!age}
            useValidation={useValidation}
            value={age}
            onChange={onChangeAge}
          />
        </Stack>
        <Stack>
          <RadioGroup
            label="성별"
            isValid={!gender}
            useValidation={useValidation}
            value={gender}
            onChange={onChangeGender}
            errorMessage="성별을 입력해주세요."
            options={[
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
            ]}
          />
        </Stack>
        <Stack style={{ marginBottom: '0px' }}>
          <Button type="submit" isLoading={isLoading}>
            등록
          </Button>
        </Stack>
      </KakaoRegisterForm>
    </Container>
  );
}
