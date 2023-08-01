import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';
import HeaderAuth from './HeaderAuth';
import HeaderPalette from './HeaderPalette';
import HeaderProfile from './HeaderProfile';
import Loader from 'components/common/Loader';
import useAccessHook from '@hooks/useAccessHook';
import { Suspense } from 'react';

const Container = styled.nav`
  position: fixed;
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.mode.main};
  padding: 0 2rem;
  z-index: 9999;
  box-shadow: ${({ theme }) => theme.shadow.n};
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

export default function Index() {
  const navigate = useNavigate();
  const userState = useRecoilValue(userAtom);
  useAccessHook();

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>Logo</Logo>
      <Wrapper>
        <HeaderPalette />
        {userState.isLogged ? (
          <Suspense fallback={<Loader />}>
            <HeaderProfile name={userState.name} />
          </Suspense>
        ) : (
          <HeaderAuth />
        )}
      </Wrapper>
    </Container>
  );
}
