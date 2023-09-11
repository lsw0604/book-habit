import { ReactNode } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  width: 100vw;
  height: 100vh;
  padding: 4rem 0rem;
  box-sizing: border-box;
`;

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default DefaultLayout;
