import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import MyBookInfo from 'components/MyBookInfo';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
`;

export default function MyBooksInfoPage() {
  const { users_books_id } = useParams();

  if (users_books_id === undefined) {
    return <div>올바른 접근이 아닙니다.</div>;
  }

  return (
    <Container>
      <MyBookInfo />
    </Container>
  );
}
