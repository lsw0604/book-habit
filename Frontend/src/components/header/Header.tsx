import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';
import HeaderAuth from 'components/header/HeaderAuth';
import HeaderProfile from 'components/header/HeaderProfile';
import Loader from 'components/common/Loader';
import { IconLeftArrow } from '@style/icons';

const Container = styled.nav`
  position: fixed;
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.md};
  z-index: 9998;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mode.typo_main};
  svg {
    width: 1rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const LoaderWrapper = styled.div`
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Index({ isLoading }: { isLoading: boolean }) {
  const navigate = useNavigate();
  const { isLogged } = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  const logoHandler = (pathname: string) => {
    if (
      pathname === '/search' ||
      pathname === '/register/kakao' ||
      pathname.includes('/login/kakao')
    )
      return <LogoWrapper>책벌래</LogoWrapper>;

    return (
      <LogoWrapper onClick={() => navigate(-1)}>
        <IconLeftArrow />
      </LogoWrapper>
    );
  };

  return (
    <>
      {pathname !== '/' && (
        <Container>
          {logoHandler(pathname)}
          <Wrapper>
            {!isLoading ? (
              isLogged ? (
                <HeaderProfile />
              ) : (
                <HeaderAuth />
              )
            ) : (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
          </Wrapper>
        </Container>
      )}
    </>
  );
}
