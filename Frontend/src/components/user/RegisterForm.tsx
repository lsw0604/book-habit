import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Divider from 'components/common/Divider';
import ValidationMessage from 'components/common/Message/ValidationMessage';
import RadioGroup from 'components/common/Radio';

import {
  IconFemale,
  IconMail,
  IconMale,
  IconNumber,
  IconPerson,
} from '@style/icons';
import useToastHook from '@hooks/useToastHook';
import useValidateHook from '@hooks/useValidateHook';
import { customize } from '@style/colors';
import useLocalRegisterMutation from '@queries/local/useLocalRegisterMutation';
import { RadioGroupOptionType } from 'types/style';

const Container = styled.form`
  max-width: 375px;
  width: 100%;
  padding: 1rem;
  overflow: scroll;
  position: relative;
  height: auto;
  border-radius: 1rem;
  @media screen and (min-width: 1280px) {
    max-width: 500px;
    padding: 2rem;
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

const Footer = styled.p`
  color: ${customize.gray['400']};
  font-size: 12px;
  margin: 0 0 0 10px;
  span {
    margin-left: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.sub};
  }
`;

const registerGenderOptions: RadioGroupOptionType<'male' | 'female' | ''>[] = [
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

export default function RegisterForm() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkedPassword, setCheckedPassword] = useState<string>('');
  const [gender, setGender] = useState<'female' | 'male' | ''>('');
  const [age, setAge] = useState<number | ''>('');

  const [useValidation, setUseValidation] = useState<boolean>(false);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);

  const onFocusPassword = useCallback(() => {
    setFocusedPassword(true);
  }, []);

  const onChangeEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [email, setEmail]
  );

  const onChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [name, setName]
  );

  const onChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [password, setPassword]
  );

  const onChangeCheckedPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCheckedPassword(event.target.value);
    },
    [checkedPassword, setCheckedPassword]
  );

  const onChangeGender = (ctx: 'male' | 'female' | '') => {
    setGender(ctx);
  };

  const onChangeAge = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const isValid = /^\d+$/.test(value);

      if (!isValid) return setAge('');

      setAge(parseInt(value, 10));
    },
    [setAge]
  );

  const navigate = useNavigate();
  const { mutate, isLoading } = useLocalRegisterMutation();
  const { addToast } = useToastHook();

  const {
    validate,
    isPasswordHasNameOrEmail,
    isPasswordHasNumberOrSymbol,
    isPasswordOverMinLength,
  } = useValidateHook({
    email,
    name,
    password,
    check_password: checkedPassword,
    mode: 'register',
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);
    if (!validate) {
      return addToast({
        status: 'error',
        message: '회원가입 폼을 지켜주세요.',
      });
    }

    return mutate({ email, name, password, gender, age: age as number });
  };

  return (
    <Container onSubmit={onSubmit}>
      <Header>회원가입</Header>
      <Stack>
        <Input
          icon={<IconMail />}
          label="이메일"
          type="email"
          value={email}
          onChange={onChangeEmail}
          useValidation={useValidation}
          isValid={!email}
          errorMessage="이메일을 입력해주세요."
        />
      </Stack>
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
        <Input
          label="비밀번호"
          type="password"
          autoComplete="off"
          value={password}
          onChange={onChangePassword}
          useValidation={useValidation}
          isValid={!password}
          errorMessage="비밀번호를 입력해주세요."
          onFocus={onFocusPassword}
        />
      </Stack>
      <Stack>
        <Input
          label="비밀번호 확인"
          type="password"
          autoComplete="off"
          value={checkedPassword}
          onChange={onChangeCheckedPassword}
          useValidation={useValidation}
          isValid={!checkedPassword}
          errorMessage="비밀번호 확인을 입력해주세요."
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
          options={registerGenderOptions}
        />
      </Stack>
      {focusedPassword && (
        <Stack>
          <ValidationMessage
            errorMessage="비밀번호에 이름 이메일을 포함할 수 없습니다."
            isValid={isPasswordHasNameOrEmail}
          />
          <ValidationMessage
            errorMessage="최소 8자리의 비밀번호를 설정하세요."
            isValid={!isPasswordOverMinLength}
          />
          <ValidationMessage
            errorMessage="숫자나 기호를 포함하세요."
            isValid={isPasswordHasNumberOrSymbol}
          />
          <ValidationMessage
            errorMessage="비밀번호와 비밀번호 확인은 같아야합니다."
            isValid={password !== checkedPassword}
          />
        </Stack>
      )}
      <Stack style={{ marginBottom: '0px' }}>
        <Button type="submit" isLoading={isLoading}>
          회원가입
        </Button>
      </Stack>
      <Divider divider={8} />
      <Footer>
        계정이 있나요 ? <span onClick={() => navigate('/login')}>로그인</span>
      </Footer>
    </Container>
  );
}

RegisterForm.displayName = 'register_form';
