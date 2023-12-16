import styled from 'styled-components';

import Divider from 'components/common/Divider';
import MyBookDetailCommentHeader from 'components/MyBookDetail/MyBookDetailCommentHeader';

interface IProps {
  item: MyBookCommentQueryItemType;
  users_books_id: number;
}

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

export default function MyBookDetailCommentItem({
  item,
  users_books_id,
}: IProps) {
  const { comment } = item;

  return (
    <Container>
      <MyBookDetailCommentHeader item={item} users_books_id={users_books_id} />
      <Divider divider={2} />
      <Content>
        <Comment>{comment}</Comment>
      </Content>
    </Container>
  );
}
