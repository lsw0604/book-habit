import styled from 'styled-components';
import { useState, FormEvent, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { AnimatePresence, motion } from 'framer-motion';

import { modalAtom } from 'recoil/modal';
import { RadioGroupOptionType } from 'types/style';
import { IconBook, IconBookMark, IconHeart } from '@style/icons';
import RadioButton from 'components/common/Radio/RadioButton';
import Read from 'components/BottomSheet/Read';
import Reading from 'components/BottomSheet/Reading';
import ToRead from 'components/BottomSheet/ToRead';
import Skeleton from 'components/BottomSheet/Skeleton';
import Button from 'components/common/Button';
import useReadModalHook from '@hooks/useReadModalHook';
import useReadingModalHook from '@hooks/useReadingModalHook';
import useReadToModalHook from '@hooks/useReadToModalHook';
import useReadingRegisterHook from '@hooks/useReadingRegisterHook';
import useReadRegisterHook from '@hooks/useReadRegisterHook';
import useReadToRegisterHook from '@hooks/useReadToRegisterHook';
import { userAtom } from 'recoil/user';
import useAlreadyBookHook from '@hooks/useAlreadyBookHook';
import Loader from 'components/common/Loader';

const Container = styled(motion.form)`
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: auto;
  min-height: 50%;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  display: grid;
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
  font-weight: 700;
  color: ${({ theme }) => theme.mode.typo_sub};
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
`;

const SubHeading = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

export default function Index() {
  const [value, setValue] = useState<ModalType>('');
  const { isLogged } = useRecoilValue(userAtom);

  const { readBookState, onChangeReadBookUseValidation, readBookFormValidate } =
    useReadModalHook();
  const {
    readingBookState,
    onChangeReadingBookUseValidation,
    readingBookFormUseValidate,
  } = useReadingModalHook();
  const {
    readToBookState,
    onChangeReadToBookUseValidation,
    readToBookFormUseValidate,
  } = useReadToModalHook();

  const { mutate: readingMutate, isLoading: readingLoading } =
    useReadingRegisterHook();
  const { mutate: readMutate, isLoading: readLoading } = useReadRegisterHook();
  const { mutate: readToMutate, isLoading: readToLoading } =
    useReadToRegisterHook();

  const { image, isbn, price, author, company, title } =
    useRecoilValue(modalAtom);

  const { filteringData, refetch, isLoading } = useAlreadyBookHook(isbn);

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

  const registerBody: BookRegisterType = {
    author: author.join(','),
    company,
    image,
    isbn,
    price,
    status: value,
    title,
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === '다읽음') {
      onChangeReadBookUseValidation(true);
      if (readBookFormValidate) {
        const body: ReadBookRegisterType = {
          ...registerBody,
          startDate: readBookState.startDate as Date,
          endDate: readBookState.endDate as Date,
          rating: readBookState.rating as number,
        };
        return readMutate(body);
      }
    } else if (value === '읽는중') {
      onChangeReadingBookUseValidation(true);
      if (readingBookFormUseValidate) {
        const body: ReadingBookRegisterType = {
          ...registerBody,
          startDate: readingBookState.startDate as Date,
          page: readingBookState.page as number,
        };
        return readingMutate(body);
      }
    } else if (value === '읽고싶음') {
      onChangeReadToBookUseValidation(true);
      if (readToBookFormUseValidate) {
        const body: ReadToBookRegisterType = {
          ...registerBody,
          rating: readToBookState.rating as number,
        };
        return readToMutate(body);
      }
    }
  };

  useEffect(() => {
    if (isLogged) {
      // refetch();
    }
  }, [isLogged]);

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
        <Heading>이 책은 어떤 책인가요 ?</Heading>
        {!isLoading ? (
          filteringData && <SubHeading>{filteringData.result}</SubHeading>
        ) : isLogged ? (
          <LoaderWrapper>
            <Loader size={2} />
          </LoaderWrapper>
        ) : null}
        <Stack>
          <RadioButton<string>
            label={title}
            value={value}
            options={options}
            onChange={onChange}
          />
        </Stack>
        <Stack style={{ height: '100%' }}>
          <AnimatePresence>
            {value === '' && <Skeleton disabled={filteringData.disabled} />}
            {value === '다읽음' && <Read />}
            {value === '읽는중' && <Reading />}
            {value === '읽고싶음' && <ToRead />}
          </AnimatePresence>
        </Stack>
        {isLogged ? (
          <Stack>
            <Button
              // disabled={filteringData.disabled || !isLogged}
              type="submit"
              isLoading={readingLoading || readLoading || readToLoading}
            >
              추가하기
            </Button>
          </Stack>
        ) : null}
      </Contents>
    </Container>
  );
}
