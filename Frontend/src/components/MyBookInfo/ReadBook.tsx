import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Stack = styled.div``;

export default function ReadBook() {
  return (
    <Container>
      <Content>
        <Stack>1</Stack>
        <Stack>2</Stack>
        <Stack>3</Stack>
      </Content>
    </Container>
  );
}
