import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const media = css`
  padding: 4rem 0rem;
  @media screen and (min-width: 768px) {
    padding: 4rem 10%;
  }
  /* @media screen and (min-width: 1280px) {
    padding: 4rem 15%;
  } */
`;

const Layout = styled.div<{ pathname: string }>`
  background-color: ${({ theme }) => theme.mode.main};
  width: 100vw;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
  ${({ pathname }) => pathname !== '/' && media};
`;

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  return <Layout pathname={pathname}>{children}</Layout>;
};

export default DefaultLayout;
