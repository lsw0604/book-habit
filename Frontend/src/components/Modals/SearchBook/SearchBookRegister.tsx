import styled from 'styled-components';
import { useState, FormEvent, memo, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { RadioGroupOptionType } from 'types/style';
import { IconBook, IconBookMark, IconHeart } from '@style/icons';
import RadioButton from 'components/common/Radio/RadioButton';
import Skeleton from 'components/Modals/SearchBook/SearchBookRegister/Skeleton';
import Button from 'components/common/Button';
import Read from 'components/Modals/SearchBook/SearchBookRegister/Read';
import Reading from 'components/Modals/SearchBook/SearchBookRegister/Reading';
import ReadTo from 'components/Modals/SearchBook/SearchBookRegister/ReadTo';

import useReadingBookMutation from '@queries/book/useReadingBookMutation';
import useReadBookMutation from '@queries/book/useReadBookMutation';
import useReadToBookMutation from '@queries/book/useReadToBookMutation';
import { searchBookAtom } from 'recoil/searchBook';
import useBookRegisterModalHook from '@hooks/useBookRegisterModalHook';
import { userAtom } from 'recoil/user';
import ImageWrapper from 'components/common/ImageWrapper';
import useToastHook from '@hooks/useToastHook';
import { customize } from '@style/colors';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  height: 190px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const HeaderImageWrapper = styled.div`
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderDetailContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 20px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.sub};
  height: auto;
`;

const Url = styled.a`
  height: auto;
  color: ${customize.gray['400']};
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8px;
  &:hover {
    color: ${({ theme }) => theme.colors.spinner};
  }
`;

const Description = styled.span`
  height: 100px;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.mode.typo_main};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  white-space: pre-line;
`;

const Content = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const searchBookRegister = () => {
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

    if (!isLogged) {
      addToast({ message: '로그인해주세요.', status: 'info' });
    }

    if (value === '') {
      addToast({ message: '등록할 유형을 선택해주세요.', status: 'info' });
    }

    if (isLogged) {
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
    }
  };

  const memorizedRegisterComponent = useMemo(() => {
    switch (value) {
      case '다읽음':
        return <Read />;
      case '읽고싶음':
        return <ReadTo />;
      case '읽는중':
        return <Reading />;
      default:
        return <Skeleton />;
    }
  }, [value]);

  return (
    <Container onSubmit={onSubmit}>
      <Header>
        <HeaderImageWrapper>
          <ImageWrapper src={thumbnail} alt={isbn} height={174} width={120} />
        </HeaderImageWrapper>
        <HeaderDetailContainer>
          <Title>{title}</Title>
          <Description>{contents}</Description>
          <Url target="_blank" href={url}>
            더보기
          </Url>
        </HeaderDetailContainer>
      </Header>
      <Content>
        <Stack>
          <RadioButton<string>
            label="등록할 유형을 선택해주세요."
            value={value}
            options={options}
            onChange={onChange}
          />
        </Stack>
        <Stack>{memorizedRegisterComponent}</Stack>
      </Content>
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
};

const SearchBookRegister = memo(searchBookRegister);

export default SearchBookRegister;
