import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export default function BottomSheetToRead() {
  return (
    <Container
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.3,
      }}
    >
      읽을 예정
    </Container>
  );
}
