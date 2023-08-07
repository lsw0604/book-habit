import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import StarRating from 'components/StarRating/Rating';
import useStarHook from '@hooks/useStarHook';
import Selector from 'components/common/Selector';
import DatePicker from 'components/common/DatePicker';

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { setStar, star } = useStarHook();

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
      <Stack></Stack>
      <Stack>
        평가하기
        <StarRating isClicked={star} setIsClicked={setStar} />
      </Stack>
    </Container>
  );
}
