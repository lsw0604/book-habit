import { useState, FormEvent } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from 'components/common/Button';
import Read from 'components/Modals/SearchBook/SearchBookRegister/Read';
import Reading from 'components/Modals/SearchBook/SearchBookRegister/Reading';
import ReadTo from 'components/Modals/SearchBook/SearchBookRegister/ReadTo';
import Skeleton from 'components/Modals/SearchBook/SearchBookRegister/Skeleton';
import RadioButton from 'components/common/Radio/RadioButton';
import { searchBookAtom } from 'recoil/searchBook';
import { userAtom } from 'recoil/user';
import useReadingBookMutation from '@queries/book/useReadingBookMutation';
import useReadBookMutation from '@queries/book/useReadBookMutation';
import useReadToBookMutation from '@queries/book/useReadToBookMutation';
import useToastHook from '@hooks/useToastHook';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { IconBook, IconBookMark, IconHeart } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';

interface IRenderRegisterComponent {
  [key: string]: React.ReactNode;
}

const Container = styled.form`
  position: relative;
  margin-bottom: 1rem;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
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
  {
    label: '읽고 싶은 책',
    value: '읽고싶음',
    icon: <IconHeart />,
    description: '아직 읽지는 않았어요.',
  },
];

const registerComponent: IRenderRegisterComponent = {
  다읽음: <Read />,
  읽고싶음: <ReadTo />,
  읽는중: <Reading />,
};

const renderRegisterComponent = (ctx?: ModalType) => {
  if (ctx === undefined || !registerComponent[ctx]) {
    return <Skeleton />;
  }
  return registerComponent[ctx];
};

export default function Form() {
  const [value, setValue] = useState<ModalType>('');

  const {
    authors,
    contents,
    thumbnail,
    isbn,
    price,
    publisher,
    url,
    title,
    status,
  } = useRecoilValue(searchBookAtom);
  const { isLogged } = useRecoilValue(userAtom);
  const { addToast } = useToastHook();
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

  const onChange = (value: string) => {
    setValue(value as ModalType);
  };

  const registerBody: BookRegisterType = {
    authors: authors.join(','),
    publisher,
    thumbnail,
    isbn,
    price,
    status,
    title,
    contents,
    url,
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === '') {
      return addToast({
        message: '등록할 유형을 선택해주세요.',
        status: 'info',
      });
    }

    if (!isLogged) {
      return addToast({ message: '로그인 해주세요.', status: 'info' });
    }

    onChangeBookRegisterModalUseValidation(true);
    if (value === '다읽음' && readValidation) {
      const body: ReadBookRegisterType = {
        ...registerBody,
        startDate: startDate as Date,
        endDate: endDate as Date,
      };
      onChangeBookRegisterModalUseValidation(false);
      return readMutate(body);
    }

    if (value === '읽는중' && readingValidation) {
      const body: ReadingBookRegisterType = {
        ...registerBody,
        startDate: startDate as Date,
      };
      onChangeBookRegisterModalUseValidation(false);
      return readingMutate(body);
    }

    if (value === '읽고싶음') {
      const body: ReadToBookRegisterType = {
        ...registerBody,
      };
      onChangeBookRegisterModalUseValidation(false);
      return readToMutate(body);
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <Stack>
        <RadioButton<string>
          label="등록할 유형을 선택해주세요."
          value={value}
          options={options}
          onChange={onChange}
        />
      </Stack>
      <Stack>{renderRegisterComponent(value)}</Stack>
      <Stack>
        <Button
          type="submit"
          isLoading={readingLoading || readLoading || readToLoading}
        >
          추가하기
        </Button>
      </Stack>
    </Container>
  );
}
