import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Button from 'components/common/Button';
import ModalHeader from 'components/Modals/ModalHeader';
import HistoryAddForm from 'components/Modals/History/HistoryAddForm';

import { IconCalendar } from '@style/icons';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookHistoryMutation from '@queries/myBook/useMyBookHistoryMutation';

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

const HEADER_OPTION = {
  title: '달력에 독서기록을 등록해요',
  sub: '등록할 독서기록의 상태와 날짜를 입력해주세요.',
  icon: <IconCalendar />,
};

export default function HistoryRegister() {
  const {
    useMyBookHistoryValidation,
    onChangeMyBookUseValidation,
    myBookUsersBooksId,
    myBookDate,
    myBookStatus,
  } = useMyBookHook();

  const { mutate, isLoading } = useMyBookHistoryMutation(
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
      <ModalHeader {...HEADER_OPTION} />
      <Content>
        <HistoryAddForm />
      </Content>
      <Footer>
        <Button isLoading={isLoading} type="submit">
          등록하기
        </Button>
      </Footer>
    </Container>
  );
}
