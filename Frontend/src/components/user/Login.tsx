import styled from 'styled-components';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from 'components/common/Input';
import Divider from 'components/common/Divider';
import Button from 'components/common/Button';
import { IconClosedEye, IconOpenEye, IconMail } from '@style/icons';
import useLoginHook from '../../hooks/useLoginHook';
import useValidateHook from '@hooks/useValidateHook';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 768px) {
    margin-top: 4rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
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
  color: ${({ theme }) => theme.mode.typo_sub};
  span {
    margin-left: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.sub};
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useValidation, setUseValidation] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);

  const navigate = useNavigate();
  const { isLoading, mutate } = useLoginHook();
  const validate = useValidateHook({ email, password, mode: 'login' });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleIcon = () => {
    setEyeOpen((prev) => !prev);
  };

  if (isLoading) {
    console.log('loading...');
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);
    if (validate) return mutate({ email, password });
  };

  useEffect(() => {
    return () => {
      setUseValidation(false);
    };
  }, [email, password]);

  return (
    <>
      <Container onSubmit={onSubmit}>
        <Wrapper>
          <Box>
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
                value={password}
                onChange={onChangePassword}
                useValidation={useValidation}
                isValid={!password}
                errorMessage="비밀번호가 필요합니다."
              />
            </Stack>
            <Stack>
              <Button type="submit">로그인</Button>
            </Stack>
            <Divider divider={12} />
            <Footer>
              계정이 없나요 ?{' '}
              <span onClick={() => navigate('/register')}>회원가입</span>
            </Footer>
          </Box>
        </Wrapper>
      </Container>
    </>
  );
}
