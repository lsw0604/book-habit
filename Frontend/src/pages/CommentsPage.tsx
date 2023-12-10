import styled from 'styled-components';

import CommentTimer from 'components/Comments/CommentTimer';
import CommentHashTag from 'components/Comments/CommentHashTag';
import CommentsListPublic from 'components/Comments/CommentListPublic';
import HelmetProvider from 'components/common/HelmetProvider';
import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import useCommentsPageHook from '@hooks/useCommentsPageHook';
import CommentEmpty from 'components/Comments/CommentEmpty';
import CommentLoading from 'components/Comments/CommentLoading';

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

const HELMET_PROVIDER_OPTIONS = {
  title: '한줄평',
  description:
    '척벌래 이용하는 유저들이 공개 등록한 한줄평을 보여주는 페이지입니다.',
};

export default function CommentsPage() {
  const { filter, addFilter, removeFilter } = useCommentsPageHook();
  const { data, isFetching, isLoading, refetch } = useCommentsListQuery(filter);

  if (data === undefined) return null;

  if (isLoading) return <CommentLoading isLoading />;

  if (data.comments.length === 0) return <CommentEmpty />;

  return (
    <>
      <HelmetProvider {...HELMET_PROVIDER_OPTIONS} />
      <Container>
        <Header>
          <CommentTimer refetch={refetch} />
          <CommentHashTag
            addFilter={addFilter}
            removeFilter={removeFilter}
            filter={filter}
          />
        </Header>
        {isFetching && <CommentLoading isLoading={false} />}
        <CommentsListPublic comments={data.comments} />
      </Container>
    </>
  );
}
