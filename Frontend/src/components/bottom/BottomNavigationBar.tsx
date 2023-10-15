import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import BottomNavigationPaletteButton from 'components/bottom/BottomNavigationPaletteButton';
import BottomNavigationButton from 'components/bottom/BottomNavigationButton';
import { IconBook, IconComments, IconPerson, IconSearch } from '@style/icons';

const Container = styled.nav`
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  position: fixed;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  background-color: ${({ theme }) => theme.mode.nav};
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
  &:first-child {
    border-radius: 1rem 0 0 0;
    overflow: hidden;
  }
  &:last-child {
    border-radius: 0 1rem 0 0;
    overflow: hidden;
  }
`;

export default function BottomNavigationBar() {
  const { pathname } = useLocation();

  const bottomRoutes = [
    {
      title: '검색하기',
      icon: <IconSearch />,
      url: '/search',
      isAuth: false,
    },
    {
      title: '한줄평',
      icon: <IconComments />,
      url: '/comments',
      isAuth: false,
    },
    {
      title: undefined,
      icon: undefined,
      url: undefined,
      isAuth: false,
    },
    {
      title: '내 서재',
      icon: <IconBook />,
      url: '/my_books',
      isAuth: true,
    },
    {
      title: '내 프로필',
      icon: <IconPerson />,
      url: '/profile',
      isAuth: true,
    },
  ];

  return (
    <>
      {pathname !== '/' ? (
        <Container>
          <Buttons>
            {bottomRoutes.map((route, index) => {
              if (!route.title && !route.icon && !route.url) {
                return (
                  <Wrapper key={index}>
                    <BottomNavigationPaletteButton />
                  </Wrapper>
                );
              }
              return (
                <Wrapper key={index}>
                  <BottomNavigationButton
                    title={route.title}
                    icon={route.icon}
                    url={route.url}
                    isAuth={route.isAuth}
                  />
                </Wrapper>
              );
            })}
          </Buttons>
        </Container>
      ) : null}
    </>
  );
}
