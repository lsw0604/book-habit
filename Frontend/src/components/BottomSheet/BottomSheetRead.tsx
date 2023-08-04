import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import StarRating from 'components/StarRating/Rating';
import useStarHook from '@hooks/useStarHook';
import DatePicker from 'components/common/DatePicker';

const Container = styled(motion.div)`
  width: 100%;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

export default function BottomSheetRead() {
  const [startDate, setStartDate] = useState<string | null>(null);

  const onChange = (date: Date | null) => {
    if (date) {
      setStartDate(date.toISOString());
    } else {
      setStartDate(null);
    }
  };

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
      <Stack>
        <DatePicker onChange={onChange} />
      </Stack>
      <Stack>
        평가하기
        <StarRating isClicked={star} setIsClicked={setStar} />
      </Stack>
    </Container>
  );
}
