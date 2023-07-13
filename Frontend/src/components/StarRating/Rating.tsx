import { SetStateAction } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Star from './Star';
import { customize } from '@style/colors';

interface IProps {
  isClicked: number;
  isHovering: number;
  setIsClicked: (value: SetStateAction<number>) => void;
  setIsHovering: (value: SetStateAction<number>) => void;
}

const Rating = styled.div`
  width: auto;
  height: auto;
  display: grid;
  place-items: center center;
  background-color: ${({ theme }) => theme.mode.main};
`;

const Container = styled.div`
  display: flex;
  font-size: 3rem;
  svg {
    fill: ${customize.yellow['400']} !important;
  }
`;

const Wrapper = styled(motion.div)`
  position: relative;
  width: 2.6rem;
  margin: 0.5rem;
  display: grid;
  place-items: center center;
`;

export default function StarRating({
  isClicked,
  isHovering,
  setIsClicked,
  setIsHovering,
}: IProps) {
  const isClickedHandler = (i: number) => {
    if (i === isClicked) {
      setIsClicked((prev) => prev - 1);
      setIsHovering((prev) => prev - 1);
    } else {
      setIsClicked(i);
    }
  };

  return (
    <Rating onMouseLeave={() => setIsHovering(0)}>
      <Container>
        {[1, 2, 3, 4, 5].map((i) => (
          <Wrapper
            key={i}
            onMouseOver={() => setIsHovering(i)}
            onClick={() => isClickedHandler(i)}
          >
            <Star
              i={i}
              isHoveringWrapper={isHovering >= i}
              isClicked={isClicked >= i}
            />
          </Wrapper>
        ))}
      </Container>
    </Rating>
  );
}
