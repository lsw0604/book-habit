import Item from 'components/MyBookInfo/Comments/Item';

import styled from 'styled-components';

const Container = styled.div``;

export default function List() {
  const dummyData = new Array(50).fill({
    id: Math.random(),
    comment: 'test',
  });

  return (
    <Container>
      {dummyData.map((v, i) => (
        <Item key={i} {...v} />
      ))}
    </Container>
  );
}
