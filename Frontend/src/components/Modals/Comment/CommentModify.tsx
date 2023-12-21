import { ChangeEvent } from 'react';
import styled from 'styled-components';

import StarRating from 'components/StarRating/Rating';
import Textarea from 'components/common/Textarea';
import Button from 'components/common/Button';
import ModalHeader from 'components/Modals/ModalHeader';
import useMyBookCommentUpdateMutation from '@queries/myBook/useMyBookCommentUpdateMutation';
import useMyBookHook from '@hooks/useMyBookHook';
import { IconPencil } from '@style/icons';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const Content = styled.div`
  position: relative;
`;

const Footer = styled.div`
  position: relative;
`;

const HEADER_OPTION = {
  title: '한줄평 수정하기',
  sub: '등록된 한줄평의 평점과 평가 내용을 수정해주세요.',
  icon: <IconPencil />,
};

export default function CommentModify() {
  const {
    myBookCommentId,
    myBookRating,
    myBookComment,
    myBookUsersBooksId,
    onChangeMyBookRating,
    onChangeMyBookComment,
  } = useMyBookHook();

  if (!myBookCommentId) return null;
  if (!myBookUsersBooksId) return null;

  const body: MyBookCommentUpdateMutationBodyType = {
    rating: myBookRating,
    comment: myBookComment,
  };

  const { mutate, isLoading } = useMyBookCommentUpdateMutation();

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ body, comment_id: myBookCommentId });
  };

  return (
    <Container onSubmit={onSubmit}>
      <ModalHeader {...HEADER_OPTION} />
      <Content>
        <StarRating rating={myBookRating} onChange={onChangeMyBookRating} />
        <Textarea
          style={{ minHeight: '150px' }}
          value={myBookComment}
          onChange={onChangeMyBookComment}
        />
      </Content>
      <Footer>
        <Button isLoading={isLoading}>수정하기</Button>
      </Footer>
    </Container>
  );
}
