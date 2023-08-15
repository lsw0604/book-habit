import useReadingModalHook from '@hooks/useReadingModalHook';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import BottomSheetStartDate from './BottomSheetStartDate';
import { useEffect, useState } from 'react';
import Input from 'components/common/Input';
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

const Span = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  display: flex;
  flex-direction: column;
`;

export default function BottomSheetReading() {
  const {
    onChangeReadingBookPage,
    onChangeReadingBookStartDate,
    readingBookPage: page,
    readingBookStartDate: startDate,
    readingBookStatus,
    setReadingBookState,
  } = useReadingModalHook();

  const [useValidation, setUseValidation] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setReadingBookState({ page: 0, startDate: null });
      setUseValidation(false);
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
        <BottomSheetStartDate
          startDate={startDate}
          onChange={onChangeReadingBookStartDate}
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
          onChange={onChangeReadingBookPage}
        />
      </Stack>
      {startDate && page !== 0 && (
        <Stack>
          <Span>
            {readingBookStatus &&
              readingBookStatus.map((value, index) => (
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
