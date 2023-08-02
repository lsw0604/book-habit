import styled from 'styled-components';

import SearchBox from 'components/Search/SearchBox';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const Heading = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 40px;
  font-weight: bold;
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
      <Heading>베스트 셀러 100</Heading>
      <Content>
        <SearchBox />
      </Content>
    </Container>
  );
};

export default HomePage;
