import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';
import { ColorType } from 'types/style';
import HeaderAuth from './HeaderAuth';
import HeaderPalette from './HeaderPalette';
import HeaderProfile from './HeaderProfile';

interface IProps {
  onToggle: () => void;
  isOn: boolean;
  selectedColor: ColorType;
  colorHandler: (color: ColorType) => void;
}

const Container = styled.nav`
  position: fixed;
  top: 0;
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.mode.main};
  padding: 0 2rem;
  z-index: 9999;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function Index({
  onToggle,
  isOn,
  selectedColor,
  colorHandler,
}: IProps) {
  const navigate = useNavigate();
  const userState = useRecoilValue(userAtom);

  return (
    <header>
      <Container>
        <Logo onClick={() => navigate('/')}>Logo</Logo>
        <Wrapper>
          <HeaderPalette
            onToggle={onToggle}
            isOn={isOn}
            selectedColor={selectedColor}
            colorHandler={colorHandler}
          />
          {userState.isLogged ? (
            <HeaderProfile name={userState.name} />
          ) : (
            <HeaderAuth />
          )}
        </Wrapper>
      </Container>
    </header>
  );
}
