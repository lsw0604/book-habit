import styled from 'styled-components';
import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import RadioButton from 'components/common/Radio/RadioButton';
import Button from 'components/common/Button';
import Skeleton from 'components/MyBookInfo/Skeleton';
import History from 'components/MyBookInfo/AddForm/History';
import Comment from 'components/MyBookInfo/AddForm/Comment';

import { RadioGroupOptionType } from 'types/style';
import { IconOpenBook, IconPencil } from '@style/icons';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookHistoryMutation from '@queries/myBook/useMyBookHistoryMutation';
import useMyBookCommentMutation from '@queries/myBook/useMyBookCommentMutation';

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
    label: '기록남기기',
    value: '기록',
    icon: <IconPencil />,
    description: '내 책에 대한 기록을 남겨요.',
  },
  {
    label: '한줄평남기기',
    value: '한줄',
    icon: <IconOpenBook />,
    description: '내 책에 한줄평을 남겨요.',
  },
];

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const [status, setStatus] = useState<'' | '기록' | '한줄'>('');

  const {
    addFormDate,
    addFormStatus,
    addFormComment,
    addFormRating,
    useMyBookAddFormHistoryValidation,
    useMyBookAddFormCommentValidation,
    onChangeAddFormUseValidation,
  } = useMyBookAddFormHook();

  const { isLoading: isHistoryRegisterLoading, mutate: historyMutate } =
    useMyBookHistoryMutation(parseInt(users_books_id));
  const { isLoading: isCommentRegisterLoading, mutate: commentMutate } =
    useMyBookCommentMutation(parseInt(users_books_id));

  const onChange = (value: string) => {
    setStatus(value as '' | '기록' | '한줄');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === '기록') {
      onChangeAddFormUseValidation(true);
      if (useMyBookAddFormHistoryValidation) {
        const body = {
          status: addFormStatus,
          date: addFormDate,
          users_books_id: parseInt(users_books_id),
        };
        return historyMutate(body as MyBookHistoryMutationRequestType);
      }
    }
    if (status === '한줄') {
      onChangeAddFormUseValidation(true);
      if (useMyBookAddFormCommentValidation) {
        const body = {
          status: addFormStatus,
          rating: addFormRating,
          comment: addFormComment,
          users_books_id: parseInt(users_books_id),
        };
        return commentMutate(body as MyBookCommentMutationRequestType);
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
        {status === '' && <Skeleton />}
        {status === '기록' && <History />}
        {status === '한줄' && <Comment />}
      </Content>
      <Stack>
        <Button
          type="submit"
          isLoading={isHistoryRegisterLoading || isCommentRegisterLoading}
        >
          등록하기
        </Button>
      </Stack>
    </Container>
  );
}
