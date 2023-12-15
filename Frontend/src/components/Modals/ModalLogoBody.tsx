import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  icon: ReactNode;
  message: string;
  highlight?: string;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 20px;
`;

const HighLight = styled.span`
  color: ${({ theme }) => theme.colors.main};
`;

export default function ModalLogoBody({ icon, message, highlight }: IProps) {
  return (
    <Container>
      <Wrapper>
        <Title>
          {highlight && <HighLight>{highlight}</HighLight>}
          {message}
        </Title>
      </Wrapper>
      <Wrapper>{icon}</Wrapper>
    </Container>
  );
}
