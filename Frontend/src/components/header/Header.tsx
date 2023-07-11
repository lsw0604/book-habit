import styled from 'styled-components';

const Container = styled.nav`
  position: fixed;
  top: 0;
  height: 3.5rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  return (
    <Container>
      <div>box</div>
      <div>box</div>
    </Container>
  );
}
