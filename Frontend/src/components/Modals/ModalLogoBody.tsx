import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  icon: ReactNode;
  message: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 10px;
  svg {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ModalLogoBody({ icon, message }: IProps) {
  return (
    <Container>
      <Wrapper>{message}</Wrapper>
      <Wrapper>{icon}</Wrapper>
    </Container>
  );
}
