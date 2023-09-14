import useModalHook from '@hooks/useModalHook';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookCommentQuery from '@queries/myBook/useMyBookCommentQuery';
import { IconPlus } from '@style/icons';
import CommentItem from 'components/MyBookInfo/Item/CommentItem';
import Icon from 'components/common/Button/Icon';
import Divider from 'components/common/Divider';
import Loader from 'components/common/Loader';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: auto;
  overflow: scroll;
  scroll-behavior: row;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EmptyTag = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_main};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CommentList() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const { setModalState } = useModalHook();
  const { onChangeAddFormUsersBooksId } = useMyBookAddFormHook();
  const commentRegisterModalHandler = () => {
    onChangeAddFormUsersBooksId(parseInt(users_books_id));
    setModalState({ isOpen: true, type: 'registerComment' });
  };

  const { data, isLoading, isFetching } = useMyBookCommentQuery(
    parseInt(users_books_id)
  );

  return (
    <Container>
      {isLoading || isFetching ? (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      ) : data?.length === 0 ? (
        <EmptyTag>
          아직 등록된 한줄평이 없습니다.
          <Icon onClick={commentRegisterModalHandler} icon={<IconPlus />}>
            AddComment
          </Icon>
        </EmptyTag>
      ) : (
        data?.map((comment) => (
          <CommentItem key={comment.comment_id} {...comment} />
        ))
      )}
      {data?.length !== 0 && (
        <>
          <Divider divider={2} />
          <AddContainer>
            <Icon onClick={commentRegisterModalHandler} icon={<IconPlus />}>
              AddComment
            </Icon>
          </AddContainer>
        </>
      )}
    </Container>
  );
}
