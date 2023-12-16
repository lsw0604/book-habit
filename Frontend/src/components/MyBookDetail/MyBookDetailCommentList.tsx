import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import useMyBookCommentListQuery from '@queries/myBook/useMyBookCommentListQuery';
import { IconPlus } from '@style/icons';
import MyBookDetailCommentItem from 'components/MyBookDetail/MyBookDetailCommentItem';
import Icon from 'components/common/Button/Icon';
import Loader from 'components/common/Loader';
import { myBookAtom } from 'recoil/myBook';
import { modalAtom } from 'recoil/modal';

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

export default function MyBookDetailCommentList({ users_books_id }: IProps) {
  const setMyBookState = useSetRecoilState(myBookAtom);
  const setModalState = useSetRecoilState(modalAtom);

  const onChangeMyBookUserBooksId = (users_books_id: number) => {
    setMyBookState((prev) => ({ ...prev, users_books_id }));
  };
  const onChangeModal = (type: ModalAtomType['type']) => {
    setModalState({ isOpen: true, type });
  };

  const commentRegisterModalHandler = () => {
    onChangeMyBookUserBooksId(users_books_id);
    onChangeModal('registerComment');
  };

  const { data, isLoading, isFetching } =
    useMyBookCommentListQuery(users_books_id);

  if (!data || isLoading || isFetching) {
    return (
      <Container>
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      </Container>
    );
  }

  if (data.length === 0) {
    return (
      <Container>
        <EmptyTag>
          아직 등록된 한줄 평이 없습니다.
          <Icon onClick={commentRegisterModalHandler} icon={<IconPlus />}>
            AddComment
          </Icon>
        </EmptyTag>
      </Container>
    );
  }

  return (
    <Container>
      <ListContainer>
        {data.map((item) => (
          <MyBookDetailCommentItem
            item={item}
            key={item.comment_id}
            users_books_id={users_books_id}
          />
        ))}
      </ListContainer>
      <AddContainer>
        <Icon onClick={commentRegisterModalHandler} icon={<IconPlus />}>
          AddComment
        </Icon>
      </AddContainer>
    </Container>
  );
}
