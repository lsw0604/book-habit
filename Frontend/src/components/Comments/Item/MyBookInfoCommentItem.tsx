import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  IconCalendar,
  IconLock,
  IconLockOpen,
  IconPencil,
  IconStar,
  IconTrashCan,
} from '@style/icons';
import Icon from 'components/common/Button/Icon';
import Divider from 'components/common/Divider';
import { customize } from '@style/colors';
import useModalHook from '@hooks/useModalHook';
import useMyBookHook from '@hooks/useMyBookHook';

const Container = styled.div`
  gap: 8px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: ${({ theme }) => theme.shadow.md};
  scroll-snap-align: start;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 50%;
`;

const HeaderIconContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 50%;
  justify-content: end;
`;

const Status = styled.h3`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 18px;
  svg {
    margin-left: 8px;
    height: 0.8rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const Content = styled.div`
  width: 100%;
  min-height: 120px;
  height: auto;
  min-height: 100px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Comment = styled.span`
  width: 100%;
  font-size: 18px;
  color: ${({ theme }) => theme.mode.typo_main};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: 25px;
  overflow: hidden;
  -webkit-line-clamp: 4;
  height: 100px;
  white-space: pre-line;
`;

const DateWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const RatingBox = styled.div`
  display: flex;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 80%;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.mode.sub};
  color: ${({ theme }) => theme.mode.typo_main};
  box-shadow: ${({ theme }) => theme.shadow.md};
  align-items: center;
  svg {
    height: 70%;
    fill: ${customize.yellow['400']};
  }
`;

export default function MyBookInfoCommentItem({
  comment_id,
  comment,
  comment_is_open,
  rating,
  status,
  updated_at,
  created_at,
}: MyBookCommentQueryItemType) {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const { setModalState } = useModalHook();
  const {
    setMyBookState,
    onChangeMyBookCommentId,
    onChangeMyBookUsersBooksId,
  } = useMyBookHook();

  const deleteHandler = () => {
    setModalState({ isOpen: true, type: 'deleteComment' });
    onChangeMyBookCommentId(comment_id);
    onChangeMyBookUsersBooksId(parseInt(users_books_id));
  };

  const modifyHandler = () => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      comment,
      rating,
      comment_id,
      users_books_id: parseInt(users_books_id),
    }));
    setModalState({ isOpen: true, type: 'modifyComment' });
  };

  return (
    <Container>
      <Header>
        <HeaderInfoContainer>
          <Status>
            {status}
            {comment_is_open ? <IconLockOpen /> : <IconLock />}
          </Status>
          <DateWrapper>
            <IconCalendar />
            &nbsp;
            {updated_at ? `${updated_at} 수정` : `${created_at} 등록`}
          </DateWrapper>
        </HeaderInfoContainer>
        <HeaderIconContainer>
          <IconBox>
            <IconStar />
            <RatingBox>{rating}</RatingBox>
          </IconBox>
          <Icon onClick={deleteHandler} icon={<IconTrashCan />}>
            Delete
          </Icon>
          <Icon onClick={modifyHandler} icon={<IconPencil />}>
            Modify
          </Icon>
        </HeaderIconContainer>
      </Header>
      <Divider divider={2} />
      <Content>
        <Comment>{comment}</Comment>
      </Content>
    </Container>
  );
}
