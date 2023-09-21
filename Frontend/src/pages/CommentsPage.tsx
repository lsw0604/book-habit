import styled from 'styled-components';

import PublicCommentsList from 'components/Comments/List/PublicCommentList';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function CommentsPage() {
  return (
    <Container>
      <PublicCommentsList />
    </Container>
  );
}
