import styled from 'styled-components';
import { useState, FormEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { AnimatePresence, motion } from 'framer-motion';

import { modalAtom } from 'recoil/modal';
import { RadioGroupOptionType } from 'types/style';
import { IconBook, IconBookMark, IconHeart } from '@style/icons';
import RadioButton from 'components/common/Radio/RadioButton';
import BottomSheetRead from './BottomSheetRead';
import BottomSheetReading from './BottomSheetReading';
import BottomSheetToRead from './BottomSheetToRead';
import Button from 'components/common/Button';

const Container = styled(motion.form)`
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 50%;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.sub};
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Heading = styled.h1`
  font-size: 18px;
  line-height: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.mode.typo_sub};
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

type ModalType = '다읽음' | '읽고싶음' | '읽는중' | '';

export default function Index() {
  const [value, setValue] = useState<ModalType>('');

  const options: RadioGroupOptionType<string>[] = [
    {
      label: '읽은 책',
      value: '다읽음',
      icon: <IconBook />,
      description: '다 읽은 책이에요.',
    },
    {
      label: '읽고 싶은 책',
      value: '읽고싶음',
      icon: <IconHeart />,
      description: '찜 해두고 있어요',
    },
    {
      label: '읽고 있는 책',
      value: '읽는중',
      icon: <IconBookMark />,
      description: '열심히 읽고 있어요.',
    },
  ];

  const onChange = (value: string) => {
    setValue(value as ModalType);
  };

  const modalState = useRecoilValue(modalAtom);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ ...modalState });
  };

  return (
    <Container
      onSubmit={onSubmit}
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
      <Contents>
        <Heading>어떤 책인가요 ?</Heading>
        <Stack>
          <RadioButton<string>
            label={modalState.title}
            value={value}
            options={options}
            onChange={onChange}
          />
        </Stack>
        <Stack style={{ height: '100%' }}>
          <AnimatePresence>
            {value === '다읽음' && <BottomSheetRead />}
            {value === '읽는중' && <BottomSheetReading />}
            {value === '읽고싶음' && <BottomSheetToRead />}
          </AnimatePresence>
        </Stack>
        <Stack>
          <Button type="submit">SUBMIT</Button>
        </Stack>
      </Contents>
    </Container>
  );
}
