import styled from 'styled-components';

import MyBooks from 'components/MyBooks';

const Container = styled.div`
  width: 100%;
  height: auto;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export default function MyBooksPage() {
  return (
    <Container>
      <MyBooks />
    </Container>
  );
}
