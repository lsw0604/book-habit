import Radio from 'components/common/Radio';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';
import { readToBookOptions } from 'lib/staticData';
import useReadToModalHook from '@hooks/useReadToModalHook';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

export default function ToRead() {
  const {
    onChangeReadToBookRating,
    readToBookRating: value,
    setReadToBookState,
    onChangeReadToBookUseValidation,
    readToBookUseValidation: useValidation,
  } = useReadToModalHook();

  useEffect(() => {
    return () => {
      setReadToBookState({ rating: 0, useValidate: false });
    };
  }, []);

  useEffect(() => {
    return () => {
      onChangeReadToBookUseValidation(false);
    };
  }, [value]);

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
        <Radio<number>
          label="이 만큼 읽고 싶어요."
          onChange={onChangeReadToBookRating}
          options={readToBookOptions}
          value={value}
          errorMessage="얼만큼 읽고 싶은지 선택해주세요."
          isValid={value === 0}
          useValidation={useValidation}
        />
      </Stack>
    </Container>
  );
}
