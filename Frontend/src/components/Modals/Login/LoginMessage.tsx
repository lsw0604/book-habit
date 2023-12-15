import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import Kakao from 'components/common/Button/Kakao';
import Divider from 'components/common/Divider';
import ModalLogoBody from 'components/Modals/ModalLogoBody';

import useModalHook from '@hooks/useModalHook';
import ModalHeader from 'components/Modals/ModalHeader';
import { IconPerson, LogoMain } from '@style/icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

export default function LoginMessage() {
  const navigate = useNavigate();
  const { setModalState } = useModalHook();

  const loginPageHandler = () => {
    navigate('/login');
    setModalState({ isOpen: false });
  };

  return (
    <Container>
      <ModalHeader
        title="책벌래는 로그인이 필요해요"
        icon={<IconPerson />}
        sub="로그인하시면 더 많은 서비스를 누릴 수 있습니다."
      />
      <ModalLogoBody
        icon={<LogoMain />}
        highlight="로그인"
        message=" 하실래요?"
      />
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
