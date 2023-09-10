import styled from 'styled-components';
import { useRef } from 'react';
import { IconImage } from '@style/icons';
import useObserverHook from '@hooks/useObserverHook';

interface IProps {
  src?: string;
  alt: string;
}

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.08);
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  width: 120px;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 5px;
    width: 100%;
    height: auto;
    object-fit: fill;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function ImageWrapper({ src, alt }: IProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const { isVisible } = useObserverHook(imageRef);

  return (
    <Container ref={imageRef}>
      {isVisible ? src ? <img src={src} alt={alt} /> : <IconImage /> : null}
    </Container>
  );
}
