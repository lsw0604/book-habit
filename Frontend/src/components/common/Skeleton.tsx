import { customize } from '@style/colors';
import { HTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';

const Animate = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`;

const Container = styled.div<{
  width?: string;
  height?: string;
  isCircle?: boolean;
}>`
  animation: ${Animate} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: hsl(210, 40%, 96.1%);
  background-color: ${customize.slate['200']};
  border-radius: ${({ isCircle }) => (isCircle ? '50%' : '1rem')};
`;

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  isCircle?: boolean;
}

export default function Skeleton({
  width,
  height,
  isCircle,
  ...props
}: SkeletonProps) {
  return (
    <Container width={width} height={height} isCircle={isCircle} {...props} />
  );
}
