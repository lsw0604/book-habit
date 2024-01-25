import styled from 'styled-components';

import { customize } from '@style/colors';
import { COMMENT_HASHTAG_LOADER_SIZES } from 'lib/staticData';
import Skeleton from 'components/common/skeleton';

interface CommentHashtagProps {
  data: CommentsListQueryResponseType;
  filter: string[];
  addFilter: (tag: string) => void;
  removeFilter: (tag: string) => void;
}

const Container = styled.ul`
  width: 100%;
  height: auto;
  max-height: 6rem;
  overflow: scroll;
  display: flex;
  gap: 0.25;
  flex-direction: row;
  padding: 1rem 0;
  flex-wrap: wrap;
  position: relative;
  scroll-snap-type: y mandatory;
  margin-bottom: 0.5rem;
`;

const Tag = styled.li<{ isOn: boolean }>`
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
  height: auto;
  overflow: auto;
  border-radius: 1rem;
  max-width: 10rem;
  min-width: 4rem;
  scroll-snap-align: start;
  line-height: 12px;
  font-size: 10px;
  padding: 5px 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  color: ${({ isOn }) =>
    isOn ? ({ theme }) => theme.colors.spinner : customize.gray['400']};
  box-shadow: ${({ theme }) => theme.shadow.md};
  background-color: ${({ theme }) => theme.mode.sub};
`;

const hashTag: string[] = [];

export default function CommentHashTag({
  data,
  filter = [],
  addFilter,
  removeFilter,
}: CommentHashtagProps) {
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

  data.comments.forEach((comment) => {
    if (!hashTag.includes(comment.title)) {
      hashTag.push(comment.title);
    }
    if (!hashTag.includes(comment.status)) {
      hashTag.push(comment.status);
    }
    if (!hashTag.includes(comment.gender)) {
      hashTag.push(comment.gender);
    }
    if (!hashTag.includes(comment.age_category)) {
      hashTag.push(comment.age_category);
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

const CommentHashTagLoaderContainer = styled.ul`
  width: 100%;
  height: auto;
  max-height: 4.5rem;
  display: flex;
  gap: 0.25rem;
  flex-direction: row;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 0.5rem;
  overflow: auto;
`;

const CommentHashTagLoaderLi = styled.li`
  margin-left: 0.5rem;
  border-radius: 1rem;
  width: auto;
`;

CommentHashTag.Loader = function CommentLoader() {
  return (
    <CommentHashTagLoaderContainer>
      {COMMENT_HASHTAG_LOADER_SIZES.map((size, index) => (
        <CommentHashTagLoaderLi key={index}>
          <Skeleton height="20px" width={size} />
        </CommentHashTagLoaderLi>
      ))}
    </CommentHashTagLoaderContainer>
  );
};
