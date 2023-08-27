import styled from 'styled-components';

import Filter from 'components/MyBookInfo/Filter';
import List from 'components/MyBookInfo/List';
import AddForm from 'components/MyBookInfo/AddForm';
import Accordion from 'components/common/Accordion';

const Container = styled.div`
  width: 100%;
  height: auto;
`;

export default function Index() {
  return (
    <Container>
      <Accordion label="Filter">
        <Filter />
      </Accordion>
      <Accordion label="List">
        <List />
      </Accordion>
      <Accordion label="Add">
        <AddForm />
      </Accordion>
    </Container>
  );
}
