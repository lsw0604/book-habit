import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import useModalHook from '@hooks/useModalHook';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookCommentQuery from '@queries/myBook/useMyBookCommentQuery';
import { IconPlus } from '@style/icons';
import MyBookInfoCommentItem from 'components/Comments/Item/MyBookInfoCommentItem';
import Icon from 'components/common/Button/Icon';
import Loader from 'components/common/Loader';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
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

export default function MyBookInfoCommentList() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const { setModalState } = useModalHook();
  const { onChangeMyBookUsersBooksId } = useMyBookHook();
  const commentRegisterModalHandler = () => {
    onChangeMyBookUsersBooksId(parseInt(users_books_id));
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
        <ListContainer>
          {data?.map((comment) => (
            <MyBookInfoCommentItem {...comment} key={comment.comment_id} />
          ))}
        </ListContainer>
      )}
      {data?.length !== 0 && (
        <AddContainer>
          <Icon onClick={commentRegisterModalHandler} icon={<IconPlus />}>
            AddComment
          </Icon>
        </AddContainer>
      )}
    </Container>
  );
}
