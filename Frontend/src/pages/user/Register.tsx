import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Divider from 'components/common/Divider';
import { IconMail, IconPerson, IconOpenEye, IconClosedEye } from '@style/icons';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 768px) {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media screen and (min-width: 768px) {
    width: 100%;
    margin-right: 0px;
    margin-left: 0px;
  }
`;

const Box = styled.div`
  box-shadow: ${({ theme }) => theme.shadow.xxl};
  background-color: ${({ theme }) => theme.mode.main};
  padding: 2.5rem;
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

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');

  const [useValidation, setUseValidation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setUseValidation(false);
    };
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <Box>
            <Header>회원가입</Header>
            <Stack>
              <Input icon={<IconMail />} label="이메일" value={email}></Input>
            </Stack>
            <Stack>
              <Input icon={<IconPerson />} label="이름" value={name}></Input>
            </Stack>
            <Stack>
              <Input label="비밀번호" value={password}></Input>
            </Stack>
            <Stack>
              <Input label="비밀번호 확인" value={checkedPassword}></Input>
            </Stack>
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
