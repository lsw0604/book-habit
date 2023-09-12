import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import StartDate from 'components/BookRegister/StartDate';
import Input from 'components/common/Input';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { IconNumber } from '@style/icons';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
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

export default function Reading() {
  const {
    onChangeBookRegisterModalStartDate: onChangeStartDate,
    onChangeBookRegisterModalPage: onChangePage,
    onChangeBookRegisterModalUseValidation: onChangeUseValidation,
    setBookRegisterModalState,
    bookRegisterModalPage: page,
    bookRegisterModalStartDate: startDate,
    bookRegisterModalUseValidation: useValidation,
    readingStatus,
  } = useBookRegisterModalHook();

  useEffect(() => {
    return () => {
      setBookRegisterModalState({
        page: 0,
        startDate: null,
        endDate: null,
        rating: 0,
        useValidate: false,
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      onChangeUseValidation(false);
    };
  }, [startDate, page]);

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
            onChange={onChangeStartDate}
            isValid={!startDate}
            useValidation={useValidation}
            errorMessage="읽기 시작한 날짜를 입력해주세요."
          />
        </Stack>
        <Stack>
          <Input
            type="number"
            label="이정도 읽었어요."
            errorMessage="지금까지 읽은 페이지를 입력해주세요."
            icon={<IconNumber />}
            isValid={!page}
            useValidation={useValidation}
            value={page}
            onChange={onChangePage}
          />
        </Stack>
      </Box>
      {startDate && page !== 0 && (
        <Stack>
          <Span>
            {readingStatus &&
              readingStatus.map((value, index) => (
                <span style={{ textAlign: 'center' }} key={index}>
                  {value}
                </span>
              ))}
          </Span>
        </Stack>
      )}
    </Container>
  );
}
