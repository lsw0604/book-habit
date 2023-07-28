import { ReactNode } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <section>
          <Layout>
            <Container>{children}</Container>
          </Layout>
        </section>
      </main>
    </>
  );
}
