import styled from 'styled-components';
import { useState } from 'react';

import Ranking from 'components/Rank/List';
import { booksSearchAPI } from 'lib/api/book';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0.5rem;
`;

const Heading = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 40px;
  font-weight: bold;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
`;

const HomePage = () => {
  const [value, setValue] = useState('');
  return (
    <Container>
      <Heading>베스트 셀러 100</Heading>
      <Content>
        <form>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              booksSearchAPI(value)
                .then((res) => console.log('ssss', JSON.stringify(res)))
                .catch((err) => console.log(err));
            }}
          >
            submit
          </button>
        </form>
        <Ranking />
      </Content>
    </Container>
  );
};

export default HomePage;
