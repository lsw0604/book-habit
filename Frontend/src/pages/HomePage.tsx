import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePage = () => {
  return (
    <Container>
      <Page>1</Page>
      <Page>2</Page>
      <Page>3</Page>
      <Page>4</Page>
    </Container>
  );
};

export default HomePage;
