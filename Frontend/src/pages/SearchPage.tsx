import styled from 'styled-components';

import SearchBox from 'components/Search/SearchBox';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
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
        <SearchBox />
      </Content>
    </Container>
  );
};

export default HomePage;
