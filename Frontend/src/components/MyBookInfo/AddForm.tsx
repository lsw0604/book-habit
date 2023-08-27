import styled from 'styled-components';
import { useState, FormEvent } from 'react';
import { AnimatePresence } from 'framer-motion';

import RadioButton from 'components/common/Radio/RadioButton';
import Button from 'components/common/Button';
import { IconBook, IconBookMark } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';
import ReadBook from 'components/MyBookInfo/Read';
import ReadingBook from 'components/MyBookInfo/Reading';
import Skeleton from 'components/MyBookInfo/Skeleton';
import useReadModalHook from '@hooks/useReadModalHook';
import useReadingModalHook from '@hooks/useReadingModalHook';
import { useParams } from 'react-router-dom';
import useMyBookAddReadHook from '@hooks/useMyBookAddReadHook';
import useMyBookAddReadingHook from '@hooks/useMyBookAddReadingHook';

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
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [status, setStatus] = useState<ModalType>('');

  const { readBookState, onChangeReadBookUseValidation, readBookFormValidate } =
    useReadModalHook();
  const {
    readingBookState,
    onChangeReadingBookUseValidation,
    readingBookFormUseValidate,
  } = useReadingModalHook();

  const { isLoading: readingLoading, mutate: readingMutate } =
    useMyBookAddReadingHook();

  const { isLoading: readLoading, mutate: readMutate } = useMyBookAddReadHook();

  const onChange = (value: string) => {
    setStatus(value as ModalType);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === '다읽음') {
      onChangeReadBookUseValidation(true);
      if (readBookFormValidate) {
        const body = {
          users_books_id: parseInt(users_books_id),
          status,
          startDate: readBookState.startDate as Date,
          endDate: readBookState.endDate as Date,
          rating: readBookState.rating as number,
        };
        readMutate(body);
      }
    } else if (status === '읽는중') {
      onChangeReadingBookUseValidation(true);
      if (readingBookFormUseValidate) {
        const body = {
          users_books_id: parseInt(users_books_id),
          status,
          startDate: readingBookState.startDate as Date,
          page: readingBookState.page as number,
        };
        readingMutate(body);
      }
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <Stack>
        <RadioButton<string>
          value={status}
          options={options}
          onChange={onChange}
        />
      </Stack>
      <Content>
        <AnimatePresence>
          {status === '' && <Skeleton />}
          {status === '다읽음' && <ReadBook />}
          {status === '읽는중' && <ReadingBook />}
        </AnimatePresence>
      </Content>
      <Stack>
        <Button isLoading={readLoading || readingLoading} type="submit">
          기록하기
        </Button>
      </Stack>
    </Container>
  );
}
