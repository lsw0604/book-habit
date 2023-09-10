import styled from 'styled-components';
import { IconTrashCan } from '@style/icons';
import Icon from 'components/common/Button/Icon';
import { useRef } from 'react';
import useObserverHook from '@hooks/useObserverHook';

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

export default function Index({
  comment_id,
  comment,
  updated_at,
  created_at,
}: MyBookPageQueriesCommentItemType) {
  const [year, month, day] = created_at.split('-');
  const updatedAt = updated_at ? updated_at.split('-') : undefined;
  const itemRef = useRef<HTMLDivElement>(null);

  const { isVisible } = useObserverHook(itemRef);
  const onHandler = () => {
    console.log(comment_id);
  };
  return (
    <Container ref={itemRef}>
      {isVisible ? (
        <>
          <DateWrapper>
            {updatedAt
              ? `${updatedAt[0]}년 ${updatedAt[1]}월 ${updatedAt[2]}일`
              : `${year}년 ${month}월 ${day}일`}
          </DateWrapper>
          <Comment>{comment}</Comment>
          <Icon onClick={onHandler} icon={<IconTrashCan />}>
            Delete
          </Icon>{' '}
        </>
      ) : null}
    </Container>
  );
}
