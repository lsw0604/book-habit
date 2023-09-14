import styled from 'styled-components';
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import Button from 'components/common/Button';
import History from 'components/MyBookInfo/AddForm/History';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookHistoryMutation from '@queries/myBook/useMyBookHistoryMutation';

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

export default function Index() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const {
    addFormDate,
    addFormStatus,
    useMyBookAddFormHistoryValidation,
    onChangeAddFormUseValidation,
  } = useMyBookAddFormHook();

  const { isLoading: isHistoryRegisterLoading, mutate: historyMutate } =
    useMyBookHistoryMutation(parseInt(users_books_id));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onChangeAddFormUseValidation(true);
    if (useMyBookAddFormHistoryValidation) {
      const body = {
        status: addFormStatus,
        date: addFormDate,
        users_books_id: parseInt(users_books_id),
      };
      return historyMutate(body as MyBookHistoryMutationRequestType);
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      <Content>
        <History />
      </Content>
      <Stack>
        <Button type="submit" isLoading={isHistoryRegisterLoading}>
          등록하기
        </Button>
      </Stack>
    </Container>
  );
}
