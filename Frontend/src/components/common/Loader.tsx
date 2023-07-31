import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

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

const Spinner = styled(motion.div)`
  height: 100%;
  width: 100%;
  border: ${({ theme }) => theme.colors.spinner} solid 2px;
  border-top: transparent solid 2px;
  border-radius: 50%;
`;

const animationVariants = {
  animate: {
    rotate: [0, 180, 360],
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    },
  },
};

interface IProps {
  size?: number;
}

export default function Loader({ size }: IProps) {
  return (
    <Container size={size}>
      <Spinner animate="animate" variants={animationVariants} />
    </Container>
  );
}
