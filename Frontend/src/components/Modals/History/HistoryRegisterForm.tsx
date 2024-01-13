import { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';

import Button from 'components/common/Button';
import HistoryAddContent from 'components/Modals/History/HistoryAddContent';

import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookHistoryRegisterMutation from '@queries/myBook/useMyBookHistoryRegisterMutation';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  position: relative;
`;

export default function HistoryRegisterForm({
  children,
}: {
  children: ReactNode;
}) {
  const {
    useMyBookHistoryValidation,
    onChangeMyBookUseValidation,
    myBookUsersBooksId,
    myBookDate,
    myBookStatus,
  } = useMyBookHook();

  const { mutate, isLoading } = useMyBookHistoryRegisterMutation(
    myBookUsersBooksId as number
  );

  const body: MyBookHistoryMutationRequestType = {
    users_books_id: myBookUsersBooksId as number,
    date: myBookDate as Date,
    status: myBookStatus as '다읽음' | '읽는중' | '읽기시작함',
  };

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChangeMyBookUseValidation(true);
    if (useMyBookHistoryValidation) {
      return mutate(body);
    }
  };

  return (
    <Container onSubmit={onSubmit}>
      {children}
      <Content>
        <HistoryAddContent />
      </Content>
      <Footer>
        <Button isLoading={isLoading} type="submit">
          등록하기
        </Button>
      </Footer>
    </Container>
  );
}
