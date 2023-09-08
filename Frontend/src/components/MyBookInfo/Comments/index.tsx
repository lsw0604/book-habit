import styled from 'styled-components';
import List from 'components/MyBookInfo/Comments/List';
import Item from 'components/MyBookInfo/Comments/Item';
import Form from 'components/MyBookInfo/Comments/Form';

const Container = styled.div``;

export default function Index() {
  return (
    <Container>
      <List />
      <Form />
    </Container>
  );
}
