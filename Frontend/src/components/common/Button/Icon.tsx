import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  children: ReactNode;
  mode?: 'text' | 'nav';
}

const backgroundColorHandler = (mode?: 'text' | 'nav') => {
  switch (mode) {
    case 'text':
      return css`
        background-color: ${({ theme }) => theme.mode.main};
        &:hover {
          background-color: ${({ theme }) => theme.mode.sub};
        }
      `;
    case 'nav':
      return css`
        background-color: ${({ theme }) => theme.mode.nav};
        &:hover {
          background-color: ${({ theme }) => theme.mode.nav};
        }
      `;
    default:
      return css`
        background-color: ${({ theme }) => theme.mode.sub};
        &:hover {
          background-color: ${({ theme }) => theme.mode.main};
        }
      `;
  }
};

const Container = styled.button<{ mode?: 'text' | 'nav' }>`
  border-radius: 9999px;
  ${({ mode }) => backgroundColorHandler(mode)};
  padding: 0.125rem;
  color: ${({ theme }) => theme.mode.typo_sub};
  border: none;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  &:focus {
    outline: none;
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
  height: 18px;
  svg {
    height: 18px;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function Icon({ mode, icon, children, ...props }: IProps) {
  return (
    <Container mode={mode} {...props}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Span>{children}</Span>
    </Container>
  );
}
