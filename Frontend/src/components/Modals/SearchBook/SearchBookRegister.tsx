import styled from 'styled-components';
import { useState, FormEvent, Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';

import { RadioGroupOptionType } from 'types/style';
import { IconBook, IconBookMark, IconHeart } from '@style/icons';
import RadioButton from 'components/common/Radio/RadioButton';
import Skeleton from 'components/SearchBookRegister/Skeleton';
import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import BookStatus from 'components/SearchBookRegister/BookStatus';

import useReadingBookMutation from '@queries/book/useReadingBookMutation';
import useReadBookMutation from '@queries/book/useReadBookMutation';
import useReadToBookMutation from '@queries/book/useReadToBookMutation';
import useMyBookExistQuery from '@queries/myBook/useMyBookExistQuery';
import { searchBookAtom } from 'recoil/searchBook';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { userAtom } from 'recoil/user';

const Read = lazy(() => import('components/SearchBookRegister/Read'));
const Reading = lazy(() => import('components/SearchBookRegister/Reading'));
const ReadTo = lazy(() => import('components/SearchBookRegister/ReadTo'));

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Content = styled.div`
  position: relative;
  margin-bottom: 1rem;
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

export default function SearchBookRegister() {
  const [value, setValue] = useState<ModalType>('');

  const { authors, contents, thumbnail, isbn, price, publisher, url, title } =
    useRecoilValue(searchBookAtom);
  const { isLogged } = useRecoilValue(userAtom);

  const { data } = useMyBookExistQuery(isbn);

  const {
    bookRegisterModalEndDate: endDate,
    bookRegisterModalStartDate: startDate,
    bookRegisterModalReadValidation: readValidation,
    bookRegisterModalReadingValidation: readingValidation,
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
      description: '아직 읽지는 않았어요.',
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
    thumbnail,
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
      };
      return readMutate(body);
    } else if (value === '읽는중' && readingValidation) {
      const body: ReadingBookRegisterType = {
        ...registerBody,
        startDate: startDate as Date,
      };
      return readingMutate(body);
    } else if (value === '읽고싶음') {
      const body: ReadToBookRegisterType = {
        ...registerBody,
      };
      return readToMutate(body);
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <Header>
        <Heading>{title}</Heading>
        {isLogged ? <BookStatus /> : null}
      </Header>
      <Content>
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
      </Content>
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
