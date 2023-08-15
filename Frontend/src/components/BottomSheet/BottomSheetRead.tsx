import { motion } from 'framer-motion';
import styled from 'styled-components';

import StarRating from 'components/StarRating/Rating';
import BottomSheetStartDate from 'components/BottomSheet/BottomSheetStartDate';
import BottomSheetEndDate from 'components/BottomSheet/BottomSheetEndDate';
import useReadModalHook from '@hooks/useReadModalHook';
import { useEffect } from 'react';

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

export default function BottomSheetRead() {
  const {
    onChangeReadBookRating,
    onChangeReadBookStartDate,
    onChangeReadBookEndDate,
    readBookEndDate: endDate,
    readBookRating: rating,
    readBookStartDate: startDate,
    readBookStatus,
    setReadBookState,
  } = useReadModalHook();

  useEffect(() => {
    return () => {
      setReadBookState({ startDate: null, endDate: null, rating: 0 });
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
      <Box>
        <Stack>
          <BottomSheetStartDate
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeReadBookStartDate}
          />
        </Stack>
        <Stack>
          <BottomSheetEndDate
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeReadBookEndDate}
          />
        </Stack>
      </Box>
      <Stack>
        <StarRating
          label="다른 사람들에게 이 정도 추천해요."
          rating={rating}
          onChange={onChangeReadBookRating}
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
