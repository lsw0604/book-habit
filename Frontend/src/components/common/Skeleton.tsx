import { customize } from '@style/colors';
import styled, { keyframes } from 'styled-components';

const Animate = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`;

const Container = styled.div<{ width?: string; height?: string }>`
  animation: ${Animate} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: hsl(210, 40%, 96.1%);
  background-color: ${customize.slate['200']};
  border-radius: 1rem;
`;

interface SkeletonProps {
  width?: string;
  height?: string;
}

export default function Skeleton({ width, height }: SkeletonProps) {
  return <Container width={width} height={height} />;
}
