import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ChangeEvent,
  FormEvent,
} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Divider from 'components/common/Divider';
import ErrorMessage from 'components/common/ErrorMessage';
import { signUpAPI } from 'lib/api/auth';
import { IconMail, IconPerson } from '@style/icons';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 768px) {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

const Box = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  /* padding: 2.5rem; */
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
  color: ${({ theme }) => theme.mode.typo_sub};
  span {
    margin-left: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.sub};
  }
`;

const PASSWORD_MIN_LENGTH = 8;

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');

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

  const navigate = useNavigate();

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !name ||
      password.includes(name) ||
      password.includes(email.split('@')[0]),
    [password, name, email]
  );

  const isPasswordOverMinLength = useMemo(
    () => password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );

  const validateForm = (): boolean => {
    if (!email || !name || !password) {
      return false;
    }

    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    ) {
      return false;
    }
    return true;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);
    if (validateForm()) {
      const { message, status } = await signUpAPI({ email, name, password });

      if (status) {
        navigate('/login');
        console.log(message);
      } else {
        console.log(message);
      }
    }
  };

  useEffect(() => {
    return () => {
      setUseValidation(false);
    };
  }, []);

  return (
    <>
      <Container onSubmit={onSubmit}>
        <Wrapper>
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
            {focusedPassword && (
              <Stack>
                <ErrorMessage
                  errorMessage="비밀번호에 본인 이름이나 이메일을 포함할 수 없습니다."
                  isValid={isPasswordHasNameOrEmail}
                />
                <ErrorMessage
                  errorMessage="최소 8자리의 비밀번호를 설정하세요."
                  isValid={!isPasswordOverMinLength}
                />
                <ErrorMessage
                  errorMessage="숫자나 기호를 포함하세요."
                  isValid={isPasswordHasNumberOrSymbol}
                />
                <ErrorMessage
                  errorMessage="비밀번호와 비밀번호 확인은 같아야합니다."
                  isValid={password !== checkedPassword}
                />
              </Stack>
            )}
            <Stack>
              <Button type="submit">회원가입</Button>
            </Stack>
            <Divider divider={12} />
            <Footer>
              계정이 있나요 ?{' '}
              <span onClick={() => navigate('/login')}>로그인</span>
            </Footer>
          </Box>
        </Wrapper>
      </Container>
    </>
  );
}