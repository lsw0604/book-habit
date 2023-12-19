import styled from 'styled-components';

import CommentsList from 'components/Comments/CommentsList';
import CommentsEmpty from 'components/Comments/CommentsEmpty';
import CommentsHashTag from 'components/Comments/CommentsHashTag';

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
  @media screen and (min-width: 768px) {
    padding: 1rem 15%;
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

export default function CommentsFilterProvider({ children }: IProps) {
  const { filter, addFilter, removeFilter } = useCommentsPageHook();
  const { data, isFetching, isLoading } = useCommentsListQuery(filter);

  if (!data) return null;

  const { comments } = data;

  if (comments.length === 0) return <CommentsEmpty />;

  return (
    <Container>
      <Header>
        {children}
        <CommentsHashTag
          addFilter={addFilter}
          removeFilter={removeFilter}
          filter={filter}
        />
      </Header>
      <CommentsList
        isFetching={isFetching}
        isLoading={isLoading}
        comments={comments}
      />
    </Container>
  );
}
