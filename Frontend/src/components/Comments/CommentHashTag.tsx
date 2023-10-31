import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import { customize } from '@style/colors';
import styled from 'styled-components';
import { v4 } from 'uuid';

const Container = styled.ul`
  width: 100%;
  height: auto;
  overflow: scroll;
  display: flex;
  gap: 5px;
  padding: 8px 0;
  flex-wrap: wrap;
  position: relative;
`;

const Tag = styled.li`
  margin-left: 8px;
  font-size: 12px;
  border-radius: 1rem;
  padding: 0 1rem;
  min-width: 50px;
  box-shadow: ${({ theme }) => theme.shadow.md};
  background-color: ${({ theme }) => theme.mode.sub};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  line-height: 14px;
  color: ${customize.gray['400']};
`;

export default function CommentHashTag() {
  const { data } = useCommentsListQuery();

  if (!data) return null;
  const hashTag: string[] = [];

  data.comments.forEach((comment) => {
    if (!hashTag.includes(comment.title)) {
      hashTag.push(comment.title);
    }
    if (!hashTag.includes(comment.status)) {
      hashTag.push(comment.status);
    }
  });

  return (
    <Container>
      {hashTag.map((tag) => (
        <Tag onClick={() => console.log(tag)} key={tag}>
          #{tag}
        </Tag>
      ))}
    </Container>
  );
}
