import styled from 'styled-components';

import Search from 'components/Search';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
`;

const HomePage = () => {
  return (
    <Container>
      <Content>
        <Search />
      </Content>
    </Container>
  );
};

export default HomePage;
