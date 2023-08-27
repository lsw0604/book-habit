import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEffect } from 'react';

import StarRating from 'components/StarRating/Rating';
import BottomSheetStartDate from 'components/BottomSheet/StartDate';
import BottomSheetEndDate from 'components/BottomSheet/EndDate';
import useReadModalHook from '@hooks/useReadModalHook';

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
    onChangeReadBookRating,
    onChangeReadBookStartDate,
    onChangeReadBookEndDate,
    onChangeReadBookUseValidation,
    readBookEndDate: endDate,
    readBookRating: rating,
    readBookStartDate: startDate,
    readBookUseValidation: useValidation,
    readBookStatus,
    setReadBookState,
  } = useReadModalHook();

  useEffect(() => {
    return () => {
      setReadBookState({
        startDate: null,
        endDate: null,
        rating: 0,
        useValidate: false,
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      onChangeReadBookUseValidation(false);
    };
  }, [startDate, endDate, rating]);

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
          <BottomSheetStartDate
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeReadBookStartDate}
            isValid={!startDate}
            useValidation={useValidation}
            errorMessage="날짜를 입력해주세요."
          />
        </Stack>
        <Stack>
          <BottomSheetEndDate
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeReadBookEndDate}
            isValid={!endDate}
            useValidation={useValidation}
            errorMessage="날짜를 입력해주세요."
          />
        </Stack>
      </Box>
      <Stack>
        <StarRating
          label="다른 사람들에게 이 정도 추천해요."
          rating={rating}
          onChange={onChangeReadBookRating}
          isValid={rating === 0}
          useValidation={useValidation}
          errorMessage="다른 사람들에게 어느정도 추천하는지 입력해주세요."
        />
      </Stack>
      {startDate && endDate && rating !== 0 && (
        <Stack>
          <Span>
            {readBookStatus &&
              readBookStatus.map((value, index) => (
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
