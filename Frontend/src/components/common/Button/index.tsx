import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  children: ReactNode;
  text?: boolean;
}

const Container = styled.button<{ text: boolean }>`
  background-color: ${(props) =>
    props.text
      ? ({ theme }) => theme.colors.main
      : ({ theme }) => theme.mode.main};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  &:hover:enabled {
    background-color: ${(props) =>
      props.text
        ? ({ theme }) => theme.colors.sub
        : ({ theme }) => theme.mode.sub};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.mode.sub};
    opacity: 0.5;
    cursor: not-allowed;
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

export default function Button({ text, children, icon, ...props }: IProps) {
  return (
    <Container text={!text} {...props}>
      {icon && <Icon>{icon}</Icon>}
      <Span>{children}</Span>
    </Container>
  );
}
