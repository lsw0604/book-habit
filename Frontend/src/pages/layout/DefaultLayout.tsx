import { ReactNode } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  width: 100vw;
  height: 100vh;

  padding: 4rem 0rem;
  box-sizing: border-box;
  @media screen and (min-width: 768px) {
    padding: 4rem 10%;
  }
  @media screen and (min-width: 1280px) {
    padding: 4rem 15%;
  }
`;

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default DefaultLayout;
