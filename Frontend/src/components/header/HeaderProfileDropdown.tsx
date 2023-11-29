import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { customize } from '@style/colors';
import { logoutAPI } from 'lib/api/auth';
import useToastHook from '@hooks/useToastHook';
import useUserStateHook from '@hooks/useUserStateHook';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';

const Container = styled.div`
  position: absolute;
  z-index: 9999;
  top: 3.5rem;
  right: 2rem;
  display: flex;
  padding: 0.1rem;
  margin-top: 0.8rem;
  flex-direction: column;
  width: 10rem;
  height: auto;
  border-width: 1px;
  border-color: ${customize.gray['100']};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mode.main};
  box-shadow: ${({ theme }) => theme.shadow.xl};
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const Li = styled.li`
  border-radius: 0.5rem;
  padding: 10px;
  width: 100%;
  height: auto;
  color: ${({ theme }) => theme.mode.typo_sub};
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${
  import.meta.env.VITE_KAKAO_REST_API
}&logout_redirect_uri=${import.meta.env.VITE_KAKAO_LOGOUT_URI}`;

export default function HeaderProfileDropdown() {
  const { userState, onChangeUserStateInitial } = useUserStateHook();
  const setModalState = useSetRecoilState(modalAtom);
  const { addToast } = useToastHook();
  const navigate = useNavigate();

  const handleModal = () =>
    setModalState({ type: 'modifyProfile', isOpen: true });

  const navigateSearchUrl = () => navigate('/search');

  const navigateMyBookUrl = () => navigate('/my_books');

  const openWindow = () => window.open(KAKAO_LOGOUT_URL, '_self');

  const handleLogout = async () => {
    if (userState.provider === 'kakao') {
      openWindow();
    }
    const { message, status } = await logoutAPI();

    onChangeUserStateInitial();
    window.localStorage.removeItem('ACCESS');
    addToast({ message, status });
  };

  const DROPDOWN_OPTIONS = [
    {
      label: '나의 서재',
      onClick: navigateMyBookUrl,
    },
    {
      label: '책 검색하기',
      onClick: navigateSearchUrl,
    },
    {
      label: '프로필 수정',
      onClick: handleModal,
    },
    {
      label: '로그아웃',
      onClick: handleLogout,
    },
  ];

  return (
    <Container>
      <Ul>
        {DROPDOWN_OPTIONS.map((option) => (
          <Li onClick={option.onClick} key={option.label}>
            <Label>
              <span>{option.label}</span>
            </Label>
          </Li>
        ))}
      </Ul>
    </Container>
  );
}
