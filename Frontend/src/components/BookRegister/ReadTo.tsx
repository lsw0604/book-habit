import Radio from 'components/common/Radio';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';
import { readToBookOptions } from 'lib/staticData';
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

export default function ToRead() {
  const {
    onChangeBookRegisterModalRating: onChangeRating,
    bookRegisterModalUseValidation: useValidation,
    bookRegisterModalRating: rating,
    setBookRegisterModalState,
    onChangeBookRegisterModalUseValidation: onChangeUseValidation,
  } = useBookRegisterModalHook();

  useEffect(() => {
    return () => {
      setBookRegisterModalState({
        rating: 0,
        useValidate: false,
        startDate: null,
        endDate: null,
        page: 0,
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      onChangeUseValidation(false);
    };
  }, [rating]);

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
          onChange={onChangeRating}
          options={readToBookOptions}
          value={rating as number}
          errorMessage="얼만큼 읽고 싶은지 선택해주세요."
          isValid={rating === 0}
          useValidation={useValidation}
        />
      </Stack>
    </Container>
  );
}
