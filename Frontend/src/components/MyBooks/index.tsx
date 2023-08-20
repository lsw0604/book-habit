import styled from 'styled-components';
import useMyBookHook from '@hooks/useMyBookHook';

const Container = styled.div`
  width: 100%;
  height: 100;
  display: block;
  justify-content: center;
  align-items: center;
`;

export default function Index() {
  const { data } = useMyBookHook();

  return (
    <Container>
      {data?.pages.map((page, index) => {
        <div key={index}>
          {page.books.map((book) => (
            <div key={book.isbn}>{book.title}</div>
          ))}
        </div>;
      })}
    </Container>
  );
}
