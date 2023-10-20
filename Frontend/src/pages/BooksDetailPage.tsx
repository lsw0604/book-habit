import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

export default function BooksDetailPage() {
  const { title } = useParams();
  return (
    <Container>
      <div>{title}</div>
    </Container>
  );
}
