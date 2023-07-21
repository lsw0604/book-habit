import { ReactNode } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  width: 100%;
  height: 100%;
  display: flex;
`;

const Container = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 786px) {
    max-width: 768px;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  @media screen and (min-width: 768px) {
    text-align: left;
    align-items: center;
    flex-direction: row;
  }
`;

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <Layout>
          <Container>
            <Contents>{children}</Contents>
          </Container>
        </Layout>
      </main>
    </>
  );
}
