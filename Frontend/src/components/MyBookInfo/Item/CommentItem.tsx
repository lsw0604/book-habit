import styled from 'styled-components';
import { IconTrashCan } from '@style/icons';
import Icon from 'components/common/Button/Icon';
import { useParams } from 'react-router-dom';
import useMyBookCommentDeleteMutation from '@queries/myBook/useMyBookCommentDeleteMutation';

const Container = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.mode.main};
  border-radius: 5px;
`;

const Comment = styled.span`
  flex: 4;
  background-color: ${({ theme }) => theme.mode.sub};
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 12px;
`;

const DateWrapper = styled.div`
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
`;

export default function CommentItem({
  comment_id,
  comment,
  rating,
  status,
  updated_at,
  created_at,
}: MyBookCommentQueryItemType) {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const { mutate, isLoading } = useMyBookCommentDeleteMutation(
    parseInt(users_books_id),
    comment_id
  );

  const onHandler = () => {
    mutate(comment_id);
  };
  return (
    <Container>
      <DateWrapper>{updated_at ? updated_at : created_at}</DateWrapper>
      <Comment>{comment}</Comment>
      {status}
      {rating}
      <Icon isLoading={isLoading} onClick={onHandler} icon={<IconTrashCan />}>
        Delete
      </Icon>{' '}
    </Container>
  );
}
