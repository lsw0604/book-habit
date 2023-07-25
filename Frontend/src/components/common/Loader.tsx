import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
`;

const Spinner = styled(motion.div)`
  height: 100%;
  width: 100%;
  border: ${({ theme }) => theme.mode.typo_main} solid 2px;
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

export default function Loader() {
  return (
    <Container>
      <Spinner animate="animate" variants={animationVariants} />
    </Container>
  );
}
