import styled from 'styled-components';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from 'components/common/Input';
import Divider from 'components/common/Divider';
import Button from 'components/common/Button';
import Kakao from 'components/common/Button/Kakao';
import { IconClosedEye, IconOpenEye, IconMail } from '@style/icons';
import { customize } from '@style/colors';
import useLocalLoginMutation from '@queries/local/useLocalLoginMutation';
import useValidateHook from '@hooks/useValidateHook';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  max-width: 375px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  border-radius: 1rem;
  @media screen and (min-width: 1280px) {
    padding: 2rem;
    max-width: 500px;
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

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { isLoading, mutate } = useLocalLoginMutation();
  const { validate } = useValidateHook({
    email,
    password,
    mode: 'login',
  });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleIcon = () => {
    setEyeOpen((prev) => !prev);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);

    if (validate) mutate({ email, password });
  };

  useEffect(() => {
    return () => {
      setUseValidation(false);
    };
  }, [email, password]);

  return (
    <Container onSubmit={onSubmit}>
      <Header>로그인</Header>
      <Stack>
        <Input
          label="이메일"
          icon={<IconMail />}
          type="email"
          value={email}
          onChange={onChangeEmail}
          useValidation={useValidation}
          isValid={!email}
          errorMessage="이메일이 필요합니다."
        />
      </Stack>
      <Stack>
        <Input
          label="비밀번호"
          icon={
            eyeOpen ? (
              <IconOpenEye onClick={toggleIcon} />
            ) : (
              <IconClosedEye onClick={toggleIcon} />
            )
          }
          type={eyeOpen ? 'text' : 'password'}
          autoComplete="off"
          value={password}
          onChange={onChangePassword}
          useValidation={useValidation}
          isValid={!password}
          errorMessage="비밀번호가 필요합니다."
        />
      </Stack>
      <Footer>
        계정이 없나요 ?{' '}
        <span onClick={() => navigate('/register')}>회원가입</span>
      </Footer>
      <Divider divider={10} />
      <Stack style={{ marginBottom: '0px' }}>
        <Button
          type="submit"
          isLoading={isLoading}
          style={{ marginBottom: '8px' }}
        >
          로그인
        </Button>
      </Stack>
      <Stack>
        <Kakao />
      </Stack>
    </Container>
  );
}
