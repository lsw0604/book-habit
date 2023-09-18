import styled from 'styled-components';
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
    object-fit: fill;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function ImageWrapper({ src, alt, height, width }: IProps) {
  return (
    <Container height={height} width={width}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : <IconImage />}
    </Container>
  );
}
