import styled from 'styled-components';

import PaletteBtn from './PaletteBtn';
import NavBtn from 'components/BottomNavigation/NavBtn';
import { IconBook, IconPlus } from '@style/icons';
import { useLocation } from 'react-router-dom';

const Container = styled.nav`
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  position: fixed;
  bottom: 0;
  border-radius: 5px 10px 0 0;
  background-color: ${({ theme }) => theme.mode.main};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Buttons = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const Wrapper = styled.li`
  width: 100%;
  height: 100%;
`;

export default function Index() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/' ? (
        <Container>
          <Buttons>
            <Wrapper>
              <NavBtn title="추가하기" icon={<IconPlus />} url="/search" />
            </Wrapper>
            <Wrapper>
              <PaletteBtn />
            </Wrapper>
            <Wrapper>
              <NavBtn
                isAuth
                title="내 서재"
                icon={<IconBook />}
                url="/my_books"
              />
            </Wrapper>
          </Buttons>
        </Container>
      ) : null}
    </>
  );
}
