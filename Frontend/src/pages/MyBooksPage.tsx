import styled from 'styled-components';

import MyBooks from 'components/MyBooks';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 11rem);
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export default function MyBooksPage() {
  return (
    <Container>
      <MyBooks />
    </Container>
  );
}
