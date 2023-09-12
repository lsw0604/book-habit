import styled from 'styled-components';
import { motion } from 'framer-motion';

import NeedLogin from 'components/common/NeedLogin';
import MyBookRegister from 'components/BookRegister';
import useModalHook from '@hooks/useModalHook';

const Container = styled(motion.div)`
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: auto;
  min-height: 40%;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  display: grid;
  background-color: ${({ theme }) => theme.mode.sub};
`;

export default function BottomSheet() {
  const { modalStateType } = useModalHook();

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
      {modalStateType === 'isLogin' && <NeedLogin />}
      {modalStateType === 'search' && <MyBookRegister />}
    </Container>
  );
}
