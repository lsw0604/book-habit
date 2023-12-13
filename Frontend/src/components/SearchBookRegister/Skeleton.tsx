import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  @media screen and (min-width: 1280px) {
    height: 100%;
  }
`;

const Stack = styled.div`
  height: 74px;
  width: 100%;
  display: flex;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background-color: rgba(150, 150, 150, 0.05);
  margin-bottom: 8px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function Skeleton() {
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
      <Stack>어떤 책인지 선택해주세요.</Stack>
    </Container>
  );
}
