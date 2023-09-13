import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import StartDate from 'components/BookRegister/StartDate';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  display: flex;
  flex-direction: column;
`;

export default function Reading() {
  const {
    onChangeBookRegisterModalStartDate: onChangeStartDate,
    onChangeBookRegisterModalUseValidation: onChangeUseValidation,
    setBookRegisterModalState,
    bookRegisterModalStartDate: startDate,
    bookRegisterModalUseValidation: useValidation,
    readingStatus,
  } = useBookRegisterModalHook();

  useEffect(() => {
    return () => {
      setBookRegisterModalState({
        startDate: null,
        endDate: null,
        useValidate: false,
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      onChangeUseValidation(false);
    };
  }, [startDate]);

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
        <StartDate
          startDate={startDate}
          onChange={onChangeStartDate}
          isValid={!startDate}
          useValidation={useValidation}
          errorMessage="읽기 시작한 날짜를 입력해주세요."
        />
      </Stack>
      <Stack>
        <Span>{readingStatus}</Span>
      </Stack>
    </Container>
  );
}
