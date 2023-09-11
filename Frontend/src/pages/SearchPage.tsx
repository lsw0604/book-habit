import styled from 'styled-components';

import Search from 'components/Search';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const HomePage = () => {
  return (
    <Container>
      <Search />
    </Container>
  );
};

export default HomePage;
