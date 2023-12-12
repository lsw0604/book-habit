import styled from 'styled-components';

import CommentListPublic from 'components/Comments/CommentListPublic';
import CommentLoading from 'components/Comments/CommentLoading';
import CommentEmpty from 'components/Comments/CommentEmpty';
import CommentHashTag from 'components/Comments/CommentHashTag';

import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import useCommentsPageHook from '@hooks/useCommentsPageHook';

interface IProps {
  children: JSX.Element;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
`;

const Header = styled.div`
  padding: 0 1rem;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
`;

export default function CommentFilterProvider({ children }: IProps) {
  const { filter, addFilter, removeFilter } = useCommentsPageHook();
  const { data, isFetching, isLoading } = useCommentsListQuery(filter);
  if (data === undefined) return null;

  if (isLoading) return <CommentLoading isLoading />;

  if (data.comments.length === 0) return <CommentEmpty />;
  return (
    <Container>
      <Header>
        {children}
        <CommentHashTag
          addFilter={addFilter}
          removeFilter={removeFilter}
          filter={filter}
        />
      </Header>
      {isFetching && <CommentLoading isLoading={false} />}
      <CommentListPublic comments={data.comments} />
    </Container>
  );
}
