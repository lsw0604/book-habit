import { SetStateAction } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Star from './Star';
import { customize } from '@style/colors';

interface IProps {
  isClicked: number;
  setIsClicked: (value: SetStateAction<number>) => void;
  label?: string;
}

const Rating = styled.div`
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.mode.main};
  border-radius: 12px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-size: 1rem;
  svg {
    fill: ${customize.yellow['400']} !important;
  }
`;

const Wrapper = styled(motion.div)`
  position: relative;
  width: auto;
  margin: 0.5rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Heading = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

export default function StarRating({ isClicked, setIsClicked, label }: IProps) {
  const isClickedHandler = (i: number) => {
    if (i === isClicked) {
      setIsClicked((prev) => prev - 1);
    } else {
      setIsClicked(i);
    }
  };

  return (
    <>
      {label && <Heading>{label}</Heading>}
      <Rating>
        <Container>
          {[1, 2, 3, 4, 5].map((i) => (
            <Wrapper key={i} onClick={() => isClickedHandler(i)}>
              <Star i={i} isClicked={isClicked >= i} />
            </Wrapper>
          ))}
        </Container>
      </Rating>
    </>
  );
}
