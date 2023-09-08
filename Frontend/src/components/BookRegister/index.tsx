import styled from 'styled-components';
import { useState, FormEvent, Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';

import { RadioGroupOptionType } from 'types/style';
import { IconBook, IconBookMark, IconHeart } from '@style/icons';
import RadioButton from 'components/common/Radio/RadioButton';
import Skeleton from 'components/BookRegister/Skeleton';
import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import BookStatus from 'components/BookRegister/BookStatus';

import useReadingBookMutation from '@queries/book/useReadingBookMutation';
import useReadBookMutation from '@queries/book/useReadBookMutation';
import useReadToBookMutation from '@queries/book/useReadToBookMutation';
import useMyBookExistQuery from '@queries/myBook/useMyBookExistQuery';
import { bottomSheetAtom } from 'recoil/bottomSheet';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';

const Read = lazy(() => import('components/BookRegister/Read'));
const Reading = lazy(() => import('components/BookRegister/Reading'));
const ReadTo = lazy(() => import('components/BookRegister/ReadTo'));

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Heading = styled.h1`
  font-size: 18px;
  line-height: 20px;
  font-weight: 700;
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

const LoaderWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Index() {
  const [value, setValue] = useState<ModalType>('');

  const { authors, contents, image, isbn, price, publisher, url, title } =
    useRecoilValue(bottomSheetAtom);

  const { data } = useMyBookExistQuery(isbn);

  const {
    bookRegisterModalEndDate: endDate,
    bookRegisterModalPage: page,
    bookRegisterModalRating: rating,
    bookRegisterModalStartDate: startDate,
    bookRegisterModalReadValidation: readValidation,
    bookRegisterModalReadingValidation: readingValidation,
    bookRegisterModalReadToValidation: readToValidation,
    onChangeBookRegisterModalUseValidation,
  } = useBookRegisterModalHook();

  const { mutate: readingMutate, isLoading: readingLoading } =
    useReadingBookMutation();
  const { mutate: readMutate, isLoading: readLoading } = useReadBookMutation();
  const { mutate: readToMutate, isLoading: readToLoading } =
    useReadToBookMutation();

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
    {
      label: '읽고 싶은 책',
      value: '읽고싶음',
      icon: <IconHeart />,
      description: '찜 해두고 있어요',
    },
  ];

  const onChange = (value: string) => {
    setValue(value as ModalType);
  };

  const disabledHandler = (status?: '등록' | '미등록') => {
    if (status === '등록') {
      return true;
    }
    return false;
  };

  const registerBody: BookRegisterType = {
    authors: authors.join(','),
    publisher,
    image,
    isbn,
    price,
    status: value,
    title,
    contents,
    url,
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChangeBookRegisterModalUseValidation(true);
    if (value === '다읽음' && readValidation) {
      const body: ReadBookRegisterType = {
        ...registerBody,
        startDate: startDate as Date,
        endDate: endDate as Date,
        rating: rating as number,
      };
      return readMutate(body);
    } else if (value === '읽는중' && readingValidation) {
      const body: ReadingBookRegisterType = {
        ...registerBody,
        startDate: startDate as Date,
        page: page as number,
      };
      return readingMutate(body);
    } else if (value === '읽고싶음' && readToValidation) {
      const body: ReadToBookRegisterType = {
        ...registerBody,
        rating: rating as number,
      };
      return readToMutate(body);
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <Heading>{title}</Heading>
      <BookStatus />
      <Stack>
        <RadioButton<string>
          label="등록할 유형을 선택해주세요."
          value={value}
          options={options}
          onChange={onChange}
          disabled={disabledHandler(data?.status)}
        />
      </Stack>
      <Suspense
        fallback={
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        }
      >
        <Stack style={{ flex: '1' }}>
          <AnimatePresence>
            {value === '' && <Skeleton />}
            {value === '다읽음' && <Read />}
            {value === '읽는중' && <Reading />}
            {value === '읽고싶음' && <ReadTo />}
          </AnimatePresence>
        </Stack>
      </Suspense>
      <Stack>
        <Button
          disabled={disabledHandler(data?.status)}
          type="submit"
          isLoading={readingLoading || readLoading || readToLoading}
        >
          추가하기
        </Button>
      </Stack>
    </Container>
  );
}
