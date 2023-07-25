import styled from 'styled-components';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  children: ReactNode;
  text?: boolean;
}

const Container = styled.button<{ text: boolean }>`
  border-radius: 9999px;
  background-color: ${({ text }) =>
    text ? ({ theme }) => theme.mode.main : ({ theme }) => theme.mode.sub};
  padding: 0.125rem;
  color: ${({ theme }) => theme.mode.typo_sub};
  border: none;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ text }) =>
      text ? ({ theme }) => theme.mode.sub : ({ theme }) => theme.mode.main};
  }
`;

const Span = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const IconWrapper = styled.div`
  height: 1.125rem;
  width: 1.125rem;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function Icon({ text, icon, children, ...props }: IProps) {
  return (
    <Container text={!!text} {...props}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Span>{children}</Span>
    </Container>
  );
}
