import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import { userAtom } from 'recoil/user';
import styled from 'styled-components';

interface IProps {
  title: string;
  icon: JSX.Element;
  url: string;
  isAuth?: boolean;
}

const Container = styled.div`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.3rem 0.1rem 0.3rem;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.nav};
`;

const Icon = styled.div<{ isOn: boolean }>`
  svg {
    fill: ${({ isOn }) =>
      isOn
        ? ({ theme }) => theme.colors.main
        : ({ theme }) => theme.mode.typo_main};
    width: 1rem;
  }
`;

const Title = styled.div<{ isOn: boolean }>`
  color: ${({ isOn }) =>
    isOn
      ? ({ theme }) => theme.colors.main
      : ({ theme }) => theme.mode.typo_main};
`;

export default function NavBtn({ title, icon, url, isAuth }: IProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const setModalState = useSetRecoilState(modalAtom);
  const { isLogged } = useRecoilValue(userAtom);

  const isOn: boolean = pathname === url || pathname.startsWith(url);

  const onChangeModal = useCallback((type: ModalAtomType['type']) => {
    setModalState({ isOpen: true, type });
  }, []);

  const onChangeUrl = (url: string) => {
    if (isAuth) {
      return isLogged ? navigate(url) : onChangeModal('isLogin');
    }
    return navigate(url);
  };

  return (
    <Container onClick={() => onChangeUrl(url)}>
      <Icon isOn={isOn}>{icon}</Icon>
      <Title isOn={isOn}>{title}</Title>
    </Container>
  );
}
