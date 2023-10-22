import styled from 'styled-components';

import useModalHook from '@hooks/useModalHook';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookCommentQuery from '@queries/myBook/useMyBookCommentQuery';
import { IconPlus } from '@style/icons';
import MyBookInfoCommentItem from 'components/Comments/Item/MyBookInfoCommentItem';
import Icon from 'components/common/Button/Icon';
import Loader from 'components/common/Loader';

interface IProps {
  users_books_id: number;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 275px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.md};
  @media screen and (min-width: 1280px) {
    max-height: 100%;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  padding: 0 1rem;
  scroll-snap-type: y mandatory;
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

export default function MyBookInfoCommentList({ users_books_id }: IProps) {
  const { setModalState } = useModalHook();
  const { onChangeMyBookUsersBooksId } = useMyBookHook();

  const commentRegisterModalHandler = () => {
    onChangeMyBookUsersBooksId(users_books_id);
    setModalState({ isOpen: true, type: 'registerComment' });
  };

  const { data, isLoading, isFetching } = useMyBookCommentQuery(users_books_id);

  if (!data || isLoading || isFetching) {
    return (
      <Container>
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      {data.length === 0 ? (
        <EmptyTag>
          아직 등록된 한줄평이 없습니다.
          <Icon onClick={commentRegisterModalHandler} icon={<IconPlus />}>
            AddComment
          </Icon>
        </EmptyTag>
      ) : (
        <ListContainer>
          {data.map((comment) => (
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
