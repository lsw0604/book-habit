import { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';

import Button from 'components/common/Button';
import CommentAddForm from 'components/Modals/Comment/CommentAddForm';
import ModalHeader from 'components/Modals/ModalHeader';
import { IconPencil } from '@style/icons';

import useMyBookHook from '@hooks/useMyBookHook';
import useModalHook from '@hooks/useModalHook';
import useMyBookCommentMutation from '@queries/myBook/useMyBookCommentMutation';

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
  title: '한줄평 등록하기',
  sub: '내 서재에 등록된 책의 상태에 따라 한줄평을 등록해주세요.',
  icon: <IconPencil />,
};

export default function CommentRegister() {
  const {
    myBookComment,
    myBookStatus,
    myBookUsersBooksId,
    myBookRating,
    myBookCommentIsOpen,
    useMyBookCommentValidation,
    onChangeMyBookUseValidation,
  } = useMyBookHook();
  const { setModalState } = useModalHook();

  const body: MyBookCommentMutationRequestType = {
    users_books_id: myBookUsersBooksId as number,
    status: myBookStatus,
    comment: myBookComment,
    comment_is_open: myBookCommentIsOpen,
    rating: myBookRating,
  };

  const { mutate, isLoading, isSuccess } = useMyBookCommentMutation(
    myBookUsersBooksId as number
  );

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChangeMyBookUseValidation(true);
    if (!useMyBookCommentValidation) return null;
    mutate(body);
    onChangeMyBookUseValidation(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setModalState({ isOpen: false, type: undefined });
    }
  }, [isSuccess]);

  return (
    <Container onSubmit={onSubmit}>
      <ModalHeader {...HEADER_OPTION} />
      <Content>
        <CommentAddForm />
      </Content>
      <Footer>
        <Button isLoading={isLoading}>등록하기</Button>
      </Footer>
    </Container>
  );
}
