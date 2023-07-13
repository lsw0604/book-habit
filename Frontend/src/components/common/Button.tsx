import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  children: ReactNode;
}

const Container = styled.button<{ icon: boolean }>`
  background-color: lightblue;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  &:hover {
    background-color: blue;
  }
`;

const Icon = styled.div`
  margin-right: 12px;
  svg {
    width: 1rme;
    height: 1rem;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const Span = styled.span`
  font-family: 'SUIT';
  font-weight: 700;
  font-size: 1rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function Button({ children, icon, ...props }: IProps) {
  return (
    <Container icon={!!icon} {...props}>
      {icon && <Icon>{icon}</Icon>}
      <Span>{children}</Span>
    </Container>
  );
}
