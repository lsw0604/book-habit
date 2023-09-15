import StarRating from 'components/StarRating/Rating';
import styled from 'styled-components';
import Textarea from 'components/common/Textarea';
import useMyBookHook from '@hooks/useMyBookHook';
import { IconPencil } from '@style/icons';
import { ChangeEvent } from 'react';
import Button from 'components/common/Button';
import useMyBookCommentUpdateMutation from '@queries/myBook/useMyBookCommentUpdateMutation';

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
  svg {
    height: 50%;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const Content = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  position: relative;
`;

export default function CommentModify() {
  const {
    myBookCommentId,
    myBookRating,
    myBookComment,
    myBookUsersBooksId,
    onChangeMyBookRating,
    onChangeMyBookComment,
  } = useMyBookHook();

  if (!myBookCommentId) return <div>잘못된 접근입니다.</div>;
  if (!myBookUsersBooksId) return <div>잘못된 접근입니다.</div>;

  const body: MyBookCommentUpdateMutationBodyType = {
    rating: myBookRating,
    comment: myBookComment,
  };

  const { mutate, isLoading } =
    useMyBookCommentUpdateMutation(myBookUsersBooksId);

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ body, comment_id: myBookCommentId });
  };

  return (
    <Container onSubmit={onSubmit}>
      <Header>수정하시겠습니까?</Header>
      <Content>
        <StarRating rating={myBookRating} onChange={onChangeMyBookRating} />
        <Textarea
          style={{ minHeight: '150px' }}
          value={myBookComment}
          onChange={onChangeMyBookComment}
        />
      </Content>
      <Footer>
        <Button isLoading={isLoading} icon={<IconPencil />}>
          수정하기
        </Button>
      </Footer>
    </Container>
  );
}
