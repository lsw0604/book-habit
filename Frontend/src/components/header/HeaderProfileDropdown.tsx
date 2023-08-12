import styled from 'styled-components';
import { customize } from '@style/colors';
import { kakaoLogoutAPI, kakaoLogoutUserAPI, logoutAPI } from 'lib/api/auth';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
import { useNavigate } from 'react-router-dom';
import useToastHook from '@hooks/useToastHook';

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

export default function HeaderProfileDropdown() {
  const [userState, setUserState] = useRecoilState(userAtom);
  const { addToast } = useToastHook();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { message, status } = await logoutAPI();
    if (status === 'success') {
      setUserState({
        id: 0,
        name: '',
        email: '',
        provider: '',
        isLogged: false,
        age: 0,
        gender: '',
      });

      await kakaoLogoutAPI(userState.email);
      await kakaoLogoutUserAPI();
      // if (userState.provider === 'kakao') {
      // }
      navigate('/');
      addToast({ message, status });
    }
  };

  return (
    <Container>
      <Ul>
        <Li onClick={() => navigate(`/profile/${userState.id}`)}>
          <Label>
            <span>내 프로필</span>
          </Label>
        </Li>
        <Li onClick={handleLogout}>
          <Label>
            <span>로그아웃</span>
          </Label>
        </Li>
      </Ul>
    </Container>
  );
}
