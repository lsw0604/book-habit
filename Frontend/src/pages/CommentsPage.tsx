import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import Loader from 'components/common/Loader';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function CommentsPage() {
  const { isLoading, isFetching, data } = useCommentsListQuery();
  console.log(data);
  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        data?.map((v, i) => <div key={i}>{v.title}</div>)
      )}
    </Container>
  );
}
