import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Icon from 'components/common/Button/Icon';
import MyBookDetailCommentItem from 'components/MyBookDetail/MyBookDetailCommentItem';
import MyBookDetailLoader from 'components/MyBookDetail/MyBookDetailLoader';
import useMyBookCommentListQuery from '@queries/myBook/useMyBookCommentListQuery';
import { myBookAtom } from 'recoil/myBook';
import { modalAtom } from 'recoil/modal';
import { IconPlus } from '@style/icons';

interface IProps {
  users_books_id: number;
}

const Container = styled.div`
  width: 100%;
  height: 275px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1280px) {
    height: 100%;
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

  if (!data) return null;
  if (isLoading || isFetching) return <MyBookDetailLoader mode="isLoading" />;

  return (
    <Container>
      {data.length !== 0 ? (
        <ListContainer>
          {data.map((item) => (
            <MyBookDetailCommentItem
              item={item}
              key={item.comment_id}
              users_books_id={users_books_id}
            />
          ))}
        </ListContainer>
      ) : (
        <MyBookDetailLoader mode="isEmpty" />
      )}
      <AddContainer>
        <Icon
          onClick={commentRegisterModalHandler}
          icon={<IconPlus />}
          isLoading={isFetching}
        >
          AddComment
        </Icon>
      </AddContainer>
    </Container>
  );
}
