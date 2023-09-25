import { LogoMain } from '@style/icons';
import styled from 'styled-components';
import Button from 'components/common/Button';
import Kakao from './Button/Kakao';
import Divider from './Divider';
import { useNavigate } from 'react-router-dom';
import useModalHook from '@hooks/useModalHook';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:last-child {
    margin-bottom: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  span {
    color: ${({ theme }) => theme.colors.main};
  }
  svg {
    width: 12rem;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 10px;
  height: 100%;
  gap: 8px;
  svg {
    width: 12rem;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 24px;
  line-height: 22px;
`;

const Description = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.mode.typo_sub};
  opacity: 0.6;
  font-size: 15px;
  span {
    color: ${({ theme }) => theme.colors.main};
  }
`;

export default function NeedLogin() {
  const navigate = useNavigate();
  const { setModalState } = useModalHook();

  const loginPageHandler = () => {
    navigate('/login');
    setModalState({ isOpen: false });
  };

  return (
    <Container>
      <Header>
        <LogoMain />
        <div>
          <Title>
            <span>책볼레</span>는
          </Title>
          <Title>
            <span>로그인</span>이 필요해요.
          </Title>
        </div>
      </Header>
      <Content>
        <div>
          <Description>
            로그인을 하시고 <span>책볼레</span>을 이용하시면
          </Description>
          <Description>
            <span>책볼레</span>의 서비스를 더 풍족하게 이용하실 수 있어요.
          </Description>
          <Description>
            아이디가 없으시다면 <span>회원가입</span>을 해주세요.
          </Description>
          <Description>
            <span>카카오톡</span>으로도 간단하게 회원가입 가능해요.
          </Description>
        </div>
      </Content>
      <Divider divider={10} />
      <Footer>
        <Stack>
          <Button onClick={loginPageHandler} type="button">
            로그인하러가기
          </Button>
        </Stack>
        <Stack>
          <Kakao />
        </Stack>
      </Footer>
    </Container>
  );
}
