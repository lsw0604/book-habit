import { ReactNode } from 'react';
import styled from 'styled-components';

import { customize } from '@style/colors';

interface IProps {
  icon?: ReactNode;
  title: string;
  sub?: string;
}

const Container = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  svg {
    height: 50%;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionMain = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 20px;
`;

const DescriptionSub = styled.span`
  font-size: 12px;
  color: ${customize.gray['400']};
`;

export default function ModalHeader({ icon, title, sub }: IProps) {
  return (
    <Container>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <DescriptionContainer>
        <DescriptionMain>{title}</DescriptionMain>
        {sub && <DescriptionSub>{sub}</DescriptionSub>}
      </DescriptionContainer>
    </Container>
  );
}
