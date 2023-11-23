import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import styled from 'styled-components';

import Loader from 'components/common/Loader';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  children: ReactNode;
  text?: boolean;
  isLoading?: boolean;
}

const Container = styled.button<{ text: boolean }>`
  width: 100%;
  justify-content: center;
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
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2rem;
  color: ${({ theme }) => theme.mode.typo_main};
`;

function button({ text, children, icon, isLoading, ...props }: IProps) {
  return (
    <Container text={!text} {...props}>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {icon && <Icon>{icon}</Icon>}
          <Span>{children}</Span>
        </>
      )}
    </Container>
  );
}

const Button = memo(button);

export default Button;
