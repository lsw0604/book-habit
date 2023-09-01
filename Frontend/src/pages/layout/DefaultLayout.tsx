import { ReactNode } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding: 4rem 1rem;
  display: flex;
`;

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default DefaultLayout;
