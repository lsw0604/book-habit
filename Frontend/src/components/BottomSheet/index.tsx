import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';

import Radio from 'components/common/Radio';
import { modalAtom } from 'recoil/modal';
import { RadioGroupOptionType } from 'types/style';
import { IconBook, IconBookMark, IconHeart } from '@style/icons';
import RadioButton from 'components/common/Radio/RadioButton';

const Container = styled(motion.form)`
  z-index: 9999;
  background-color: ${({ theme }) => theme.mode.sub};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: sc;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
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

export default function Index() {
  const [value, setValue] = useState<string>('');

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
    setValue(value);
  };

  const modalState = useRecoilValue(modalAtom);

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
      </Contents>
    </Container>
  );
}
