import styled from 'styled-components';
import { motion } from 'framer-motion';

import Star from './Star';
import { customize } from '@style/colors';
import ErrorMessage from 'components/common/Message/ErrorMessage';

const Rating = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 12px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;
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

export default function StarRating({
  rating,
  onChange,
  label,
  errorMessage,
  isValid,
  useValidation,
}: IStarRating) {
  const isClickedHandler = (i: number) => {
    if (i === rating) {
      onChange(rating - 1);
    } else {
      onChange(i);
    }
  };

  return (
    <>
      {label && <Heading>{label}</Heading>}
      <Rating>
        <Container>
          {[1, 2, 3, 4, 5].map((i) => (
            <Wrapper key={i} onClick={() => isClickedHandler(i)}>
              <Star i={i} isClicked={rating >= i} />
            </Wrapper>
          ))}
        </Container>
      </Rating>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}
