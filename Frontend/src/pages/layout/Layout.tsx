import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
