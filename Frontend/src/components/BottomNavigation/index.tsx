import styled from 'styled-components';

import PaletteBtn from './PaletteBtn';
import NavBtn from 'components/BottomNavigation/NavBtn';
import { IconBook, IconSearch } from '@style/icons';

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
  return (
    <Container>
      <Buttons>
        <Wrapper>
          <NavBtn title="검색하기" icon={<IconSearch />} url="/search" />
        </Wrapper>
        <Wrapper>
          <PaletteBtn />
        </Wrapper>
        <Wrapper>
          <NavBtn isAuth title="내 서재" icon={<IconBook />} url="/my_books" />
        </Wrapper>
      </Buttons>
    </Container>
  );
}
