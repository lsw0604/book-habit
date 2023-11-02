import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import { customize } from '@style/colors';
import styled from 'styled-components';

interface IProps {
  filter: string[];
  addFilter: (tag: string) => void;
  removeFilter: (tag: string) => void;
}

const Container = styled.ul`
  width: 100%;
  height: auto;
  max-height: 95px;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px 0;
  flex-wrap: wrap;
  position: relative;
  scroll-snap-type: y mandatory;
`;

const Tag = styled.li<{ isOn: boolean }>`
  scroll-snap-align: start;
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
  cursor: pointer;
  color: ${({ isOn }) =>
    isOn ? ({ theme }) => theme.colors.spinner : customize.gray['400']};
`;

export default function CommentHashTag({
  filter,
  addFilter,
  removeFilter,
}: IProps) {
  const { data } = useCommentsListQuery([]);

  const filterHandler = (tag: string) => {
    if (filter.includes(tag)) {
      removeFilter(tag);
    } else {
      addFilter(tag);
    }
  };

  const isOn = (tag: string) => {
    return filter.includes(tag);
  };

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
        <Tag key={tag} onClick={() => filterHandler(tag)} isOn={isOn(tag)}>
          #&nbsp;{tag}
        </Tag>
      ))}
    </Container>
  );
}