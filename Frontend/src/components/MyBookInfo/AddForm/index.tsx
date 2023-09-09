import styled from 'styled-components';
import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import RadioButton from 'components/common/Radio/RadioButton';
import Button from 'components/common/Button';
import Skeleton from 'components/MyBookInfo/Skeleton';
import History from 'components/MyBookInfo/AddForm/History';
import Rating from 'components/MyBookInfo/AddForm/Rating';
import Comment from 'components/MyBookInfo/AddForm/Comment';

import { RadioGroupOptionType } from 'types/style';
import { IconOpenBook, IconPencil, IconStar } from '@style/icons';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookHistoryMutation from '@queries/myBook/useMyBookHistoryMutation';
import useMyBookRatingMutation from '@queries/myBook/useMyBookRatingMutation';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  margin-bottom: 8px;
  min-height: 8rem;
`;

const options: RadioGroupOptionType<string>[] = [
  {
    label: '책기록등록',
    value: '기록',
    icon: <IconPencil />,
    description: '내 책에 대한 기록을 남겨요.',
  },
  {
    label: '평점매기기',
    value: '평점',
    icon: <IconStar />,
    description: '내 책에 평점을 매겨요.',
  },
  {
    label: '한줄평등록',
    value: '한줄',
    icon: <IconOpenBook />,
    description: '내 책에 한줄평을 남겨요.',
  },
];

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [status, setStatus] = useState<'' | '기록' | '평점' | '한줄'>('');
  const {
    addFormDate,
    addFormStatus,
    addFormPage,
    addFromRating,
    useMyBookAddFormHistoryValidation,
    useMyBookAddFromRatingValidation,
    onChangeAddFormUseValidation,
  } = useMyBookAddFormHook();

  const { isLoading: isHistoryRegisterLoading, mutate: historyMutate } =
    useMyBookHistoryMutation(parseInt(users_books_id));
  const { isLoading: isRatingRegisterLoading, mutate: ratingMutate } =
    useMyBookRatingMutation(parseInt(users_books_id));

  const onChange = (value: string) => {
    setStatus(value as '' | '기록' | '평점');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === '기록') {
      onChangeAddFormUseValidation(true);
      if (useMyBookAddFormHistoryValidation) {
        const body =
          addFormStatus === '읽는중'
            ? {
                status: addFormStatus,
                date: addFormDate,
                users_books_id: parseInt(users_books_id),
                page: addFormPage,
              }
            : {
                status: addFormStatus,
                date: addFormDate,
                users_books_id: parseInt(users_books_id),
              };
        return historyMutate(body as MyBookHistoryMutationRequestType);
      }
    }

    if (status === '평점') {
      onChangeAddFormUseValidation(true);
      if (useMyBookAddFromRatingValidation) {
        const body = {
          status: addFormStatus,
          rating: addFromRating,
          users_books_id: parseInt(users_books_id),
        };
        return ratingMutate(body as MyBookRatingMutationRequestType);
      }
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <Stack>
        <RadioButton<string>
          label="추가하고 싶은 상태 유형을 골라주세요."
          value={status}
          options={options}
          onChange={onChange}
        />
      </Stack>
      <Content>
        {status === '' && <Skeleton />}
        {status === '기록' && <History />}
        {status === '평점' && <Rating />}
        {status === '한줄' && <Comment />}
      </Content>
      <Stack>
        <Button
          type="submit"
          isLoading={isHistoryRegisterLoading || isRatingRegisterLoading}
        >
          등록하기
        </Button>
      </Stack>
    </Container>
  );
}
