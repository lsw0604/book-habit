import styled from 'styled-components';

import MyBooks from 'components/MyBooks';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
`;

export default function Profile() {
  return (
    <Container>
      <MyBooks />
    </Container>
  );
}
