import styled from 'styled-components';
import { useEffect } from 'react';
import { myBooksInfoAPI } from 'lib/api/book';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
`;

export default function MyBooksInfoPage() {
  const { isbn } = useParams();

  useEffect(() => {
    myBooksInfoAPI(isbn as string).then((res) => console.log(res));
  }, []);
  return (
    <Container>
      <span>내 책정보</span>
    </Container>
  );
}
