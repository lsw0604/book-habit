import styled from 'styled-components';

import Search from 'components/Search';

const Container = styled.div`
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const HomePage = () => {
  return (
    <Container>
      <Search />
    </Container>
  );
};

export default HomePage;
