import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';
import HeaderAuth from 'components/header/HeaderAuth';
import HeaderProfile from 'components/header/HeaderProfile';
import Loader from 'components/common/Loader';

const Container = styled.nav`
  position: fixed;
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  background-color: ${({ theme }) => theme.mode.main};
  z-index: 9998;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mode.typo_main};
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

  return (
    <>
      {pathname !== '/' ? (
        <Container>
          <LogoWrapper onClick={() => navigate('/')}>책벌래</LogoWrapper>
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
      ) : null}
    </>
  );
}
