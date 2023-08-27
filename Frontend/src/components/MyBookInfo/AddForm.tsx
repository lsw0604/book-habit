import styled from 'styled-components';
import { useState } from 'react';

import RadioButton from 'components/common/Radio/RadioButton';
import Button from 'components/common/Button';
import { IconBook, IconBookMark } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';
import ReadBook from 'components/MyBookInfo/Read';
import ReadingBook from 'components/MyBookInfo/ReadingBook';
import Skeleton from 'components/MyBookInfo/Skeleton';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 8px;
  min-height: 10rem;
`;

const options: RadioGroupOptionType<string>[] = [
  {
    label: '읽은 책',
    value: '다읽음',
    icon: <IconBook />,
    description: '다 읽은 책이에요.',
  },
  {
    label: '읽고 있는 책',
    value: '읽는중',
    icon: <IconBookMark />,
    description: '열심히 읽고 있어요.',
  },
];

export default function AddForm() {
  const [value, setValue] = useState<ModalType>('');
  const onChange = (value: string) => {
    setValue(value as ModalType);
  };

  return (
    <Container>
      <Stack>
        <RadioButton<string>
          value={value}
          options={options}
          onChange={onChange}
        />
      </Stack>
      <Content>
        {value === '' && <Skeleton />}
        {value === '다읽음' && <ReadBook />}
        {value === '읽는중' && <ReadingBook />}
      </Content>
      <Stack>
        <Button>추가하기</Button>
      </Stack>
    </Container>
  );
}
