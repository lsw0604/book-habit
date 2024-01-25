import styled, { css, keyframes } from 'styled-components';

const Animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerSize = (ctx?: number) => {
  if (ctx === undefined) {
    return css`
      width: 1rem;
      height: 1rem;
    `;
  } else {
    return css`
      width: ${ctx}rem;
      height: ${ctx}rem;
    `;
  }
};

const Container = styled.div<{ size?: number }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  ${({ size }) => SpinnerSize(size)}
`;

const Spinner = styled.div`
  height: 100%;
  width: 100%;
  border: ${({ theme }) => theme.colors.spinner} solid 2px;
  border-top: transparent solid 2px;
  border-radius: 50%;
  animation: ${Animate} 1s linear infinite;
`;

interface LoaderProps {
  size?: number;
}

export default function Loader({ size }: LoaderProps) {
  return (
    <Container size={size}>
      <Spinner />
    </Container>
  );
}
