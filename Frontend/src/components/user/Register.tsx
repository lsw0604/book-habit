import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Divider from 'components/common/Divider';
import ValidationMessage from 'components/common/Message/ValidationMessage';
import {
  IconFemale,
  IconMail,
  IconMale,
  IconNumber,
  IconPerson,
} from '@style/icons';
import useToastHook from '@hooks/useToastHook';
import useValidateHook from '@hooks/useValidateHook';
import useSignupHook from '@hooks/useSignupHook';
import RadioGroup from 'components/common/Radio';
import { customize } from '@style/colors';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  max-width: 375px;
  width: 100%;
  height: auto;
`;

const Box = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 0.75rem;
  flex-direction: column;
  width: 100%;
  display: flex;
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
  font-weight: 800;
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

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | ''>('');
  const [age, setAge] = useState<number | ''>('');

  const [useValidation, setUseValidation] = useState(false);

  const [focusedPassword, setFocusedPassword] = useState(false);

  const onFocusPassword = useCallback(() => {
    setFocusedPassword(true);
  }, []);

  const onChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const onChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const onChangeCheckedPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCheckedPassword(event.target.value);
    },
    []
  );

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

  const navigate = useNavigate();
  const { mutate, isLoading } = useSignupHook();
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
    if (validate) {
      if (email && name && password && gender && age) {
        return mutate({ email, name, password, gender, age });
      }
    } else {
      addToast({ status: 'error', message: '회원가입 폼을 지켜주세요.' });
    }
  };

  useEffect(() => {
    return () => {
      setUseValidation(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmit}>
      <Box>
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
        <Box style={{ flexDirection: 'row', gap: '8px' }}>
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
        </Box>
        <Stack>
          <Input
            label="비밀번호"
            type="password"
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
        {focusedPassword && (
          <Stack>
            <ValidationMessage
              errorMessage="비밀번호에 본인 이름이나 이메일을 포함할 수 없습니다."
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
      </Box>
    </Container>
  );
}
