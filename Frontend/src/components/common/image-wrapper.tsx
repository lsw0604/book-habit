import styled from 'styled-components';
import { useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import Skeleton from './Skeleton';
import { IconImage } from '@style/icons';

interface IProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
}

const Container = styled.div<{ width: number; height: number }>`
  background-color: rgba(0, 0, 0, 0.08);
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 5px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '10px',
  threshold: 0.1,
};

export default function ImageWrapper({ src, alt, height, width }: IProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(itemRef, OBSERVER_OPTION);
  const isVisible = !!entry?.isIntersecting;

  return (
    <Container height={height} width={width} ref={itemRef}>
      {src ? (
        isVisible ? (
          <img src={src} alt={alt} height={height} width={width} />
        ) : (
          <Skeleton width={`${width}px`} height={`${height}px`} />
        )
      ) : (
        <IconImage />
      )}
    </Container>
  );
}
