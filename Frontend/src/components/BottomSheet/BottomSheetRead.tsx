import { motion } from 'framer-motion';
import styled from 'styled-components';

import StarRating from 'components/StarRating/Rating';
import BottomSheetStartDate from 'components/BottomSheet/BottomSheetStartDate';
import BottomSheetEndDate from 'components/BottomSheet/BottomSheetEndDate';
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

export default function BottomSheetRead() {
  const { rating, setRating } = useReadModalHook();

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
          <BottomSheetStartDate />
        </Stack>
        <Stack>
          <BottomSheetEndDate />
        </Stack>
      </Box>
      <Stack>
        <StarRating
          label="평가 점수"
          isClicked={rating}
          setIsClicked={setRating}
        />
      </Stack>
    </Container>
  );
}
