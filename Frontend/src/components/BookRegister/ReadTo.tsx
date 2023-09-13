import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function ToRead() {
  const {
    setBookRegisterModalState,
    onChangeBookRegisterModalUseValidation: onChangeUseValidation,
  } = useBookRegisterModalHook();

  useEffect(() => {
    return () => {
      setBookRegisterModalState({
        useValidate: false,
        startDate: null,
        endDate: null,
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      onChangeUseValidation(false);
    };
  }, []);

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
      <Stack>
        <span>아직 읽진 않았지만</span>
        <span>곧 읽을 예정이에요.</span>
      </Stack>
    </Container>
  );
}
