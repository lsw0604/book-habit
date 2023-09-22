import styled from 'styled-components';

import BottomNavigationPaletteButton from 'components/bottom/BottomNavigationPaletteButton';
import BottomNavigationButton from 'components/bottom/BottomNavigationButton';
import { IconBook, IconComments, IconPerson, IconSearch } from '@style/icons';
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

export default function BottomNavigationBar() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/' ? (
        <Container>
          <Buttons>
            <Wrapper>
              <BottomNavigationButton
                title="검색하기"
                icon={<IconSearch />}
                url="/search"
              />
            </Wrapper>
            <Wrapper>
              <BottomNavigationButton
                title="한줄평"
                icon={<IconComments />}
                url="/comments"
              />
            </Wrapper>
            <Wrapper>
              <BottomNavigationPaletteButton />
            </Wrapper>
            <Wrapper>
              <BottomNavigationButton
                isAuth
                title="내 서재"
                icon={<IconBook />}
                url="/my_books"
              />
            </Wrapper>
            <Wrapper>
              <BottomNavigationButton
                isAuth
                title="내 프로필"
                icon={<IconPerson />}
                url="/profile"
              />
            </Wrapper>
          </Buttons>
        </Container>
      ) : null}
    </>
  );
}
