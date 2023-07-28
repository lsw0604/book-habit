import styled from 'styled-components';

import Ranking from 'components/Rank/List';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
`;

export default function Home() {
  return (
    <Container>
      <Ranking />
    </Container>
  );
}
