import styled from 'styled-components';

const Container = styled.div`
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.footer};
  width: 100%;
`;

export default function Footer() {
  return <Container>Footer</Container>;
}
