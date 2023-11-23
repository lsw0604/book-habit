import styled from 'styled-components';
import SearchRegisterHeader from './SearchBookRegister/Header';
import Form from './SearchBookRegister/Form';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function SearchBookRegister() {
  return (
    <Container>
      <SearchRegisterHeader />
      <Form />
    </Container>
  );
}
