import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEffect } from 'react';

import StartDate from 'components/Modals/SearchBook/SearchBookRegister/StartDate';
import EndDate from 'components/Modals/SearchBook/SearchBookRegister/EndDate';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';

const Container = styled(motion.div)`
  width: 100%;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  display: flex;
  flex-direction: column;
`;

export default function Read() {
  const {
    onChangeBookRegisterModalStartDate: onChangeStartDate,
    onChangeBookRegisterModalEndDate: onChangeEndDate,
    onChangeBookRegisterModalUseValidation: onChangeUseValidation,
    setBookRegisterModalState: setState,
    bookRegisterModalStartDate: startDate,
    bookRegisterModalEndDate: endDate,
    bookRegisterModalUseValidation: useValidation,
    readStatus,
  } = useBookRegisterModalHook();

  useEffect(() => {
    return () => {
      setState({
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
  }, [startDate, endDate]);

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
      <Box>
        <Stack>
          <StartDate
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeStartDate}
            isValid={!startDate}
            useValidation={useValidation}
            errorMessage="날짜를 입력해주세요."
          />
        </Stack>
        <Stack>
          <EndDate
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeEndDate}
            isValid={!endDate}
            useValidation={useValidation}
            errorMessage="날짜를 입력해주세요."
          />
        </Stack>
      </Box>
      {startDate && endDate && (
        <Stack>
          <Span>{readStatus}</Span>
        </Stack>
      )}
    </Container>
  );
}
