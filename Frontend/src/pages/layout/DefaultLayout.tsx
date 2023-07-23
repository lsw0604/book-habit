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

const Contents = styled.div`
  margin-top: 4rem;
  margin-bottom: 12rem;
`;

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <section>
          <Layout>
            <Container>
              <Contents>{children}</Contents>
            </Container>
          </Layout>
        </section>
      </main>
    </>
  );
}
