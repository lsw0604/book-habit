import styled from 'styled-components';

import MyBooks from 'components/MyBooks';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export default function MyBooksPage() {
  return (
    <Container>
      <MyBooks />
    </Container>
  );
}
