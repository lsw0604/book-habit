import styled from 'styled-components';
import NavBtn from 'components/BottomNavigation/NavBtn';
import { IconHome } from '@style/icons';

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
  background-color: ${({ theme }) => theme.mode.nav};
  overflow: hidden;
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
          <NavBtn title="다른사람" icon={<IconHome />} />
        </Wrapper>
        <Wrapper>Search</Wrapper>
        <Wrapper>MyBooks</Wrapper>
        <Wrapper>Profile</Wrapper>
      </Buttons>
    </Container>
  );
}
