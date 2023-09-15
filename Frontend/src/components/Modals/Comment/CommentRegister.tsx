import { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { customize } from '@style/colors';
import { IconBook, IconPencil } from '@style/icons';
import Button from 'components/common/Button';
import Comment from 'components/MyBookInfo/AddForm/Comment';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookCommentMutation from '@queries/myBook/useMyBookCommentMutation';
import useModalHook from '@hooks/useModalHook';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const HeaderIconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  svg {
    height: 50%;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const HeaderDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderDescriptionMain = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 20px;
`;

const HeaderDescriptionSub = styled.span`
  font-size: 12px;
  color: ${customize.gray['400']};
`;

const Content = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  position: relative;
`;

export default function CommentRegister() {
  const {
    myBookComment,
    myBookStatus,
    myBookUsersBooksId,
    myBookRating,
    useMyBookCommentValidation,
    onChangeMyBookUseValidation,
  } = useMyBookHook();
  const { setModalState } = useModalHook();

  const body: MyBookCommentMutationRequestType = {
    users_books_id: myBookUsersBooksId as number,
    status: myBookStatus,
    comment: myBookComment,
    rating: myBookRating,
  };

  const { mutate, isLoading, isSuccess } = useMyBookCommentMutation(
    myBookUsersBooksId as number
  );

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChangeMyBookUseValidation(true);
    if (useMyBookCommentValidation) {
      mutate(body);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setModalState({ isOpen: false, type: undefined });
    }
  }, [isSuccess]);

  return (
    <Container onSubmit={onSubmit}>
      <Header>
        <HeaderIconWrapper>
          <IconBook />
        </HeaderIconWrapper>
        <HeaderDescriptionContainer>
          <HeaderDescriptionMain>한줄평을 등록해요</HeaderDescriptionMain>
          <HeaderDescriptionSub>
            한줄평을 읽은 상태에 상관없이 등록해주세요.
          </HeaderDescriptionSub>
        </HeaderDescriptionContainer>
      </Header>
      <Content>
        <Comment />
      </Content>
      <Footer>
        <Button isLoading={isLoading} icon={<IconPencil />}>
          등록하기
        </Button>
      </Footer>
    </Container>
  );
}
