import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';
import HeaderAuth from './HeaderAuth';
import HeaderPalette from './HeaderPalette';
import HeaderProfile from './HeaderProfile';
import Loader from 'components/common/Loader';

const Container = styled.nav`
  position: fixed;
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 9998;
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

const LoaderWrapper = styled.div`
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Index({ isLoading }: { isLoading: boolean }) {
  const navigate = useNavigate();
  const userState = useRecoilValue(userAtom);

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>Logo</Logo>
      <Wrapper>
        <HeaderPalette />
        {userState.isLogged ? (
          !isLoading ? (
            <HeaderProfile name={userState.name} />
          ) : (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )
        ) : !isLoading ? (
          <HeaderAuth />
        ) : (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
      </Wrapper>
    </Container>
  );
}
