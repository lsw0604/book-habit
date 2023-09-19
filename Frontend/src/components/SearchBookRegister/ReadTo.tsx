import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { LogoHeart } from '@style/icons';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.mode.typo_main};
  svg {
    height: 100%;
  }
`;

const Message = styled.h1`
  font-size: 25px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
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
      <Content>
        <Message>
          <span>읽지는 않았지만</span>
          <span>관심있는 책이에요.</span>
        </Message>
        <LogoHeart />
      </Content>
    </Container>
  );
}
