import { ReactNode } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  width: 100vw;
  height: 100vh;
  padding-top: 4rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  display: flex;
`;

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  );
};

export default DefaultLayout;
