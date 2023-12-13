import styled from 'styled-components';
import MyBooksItem from 'components/MyBooks/MyBooksItem';

interface IProps {
  page: MyBookListInfinityQueryResponseType;
}

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  &:last-child {
    margin-bottom: 0px;
  }

  @media screen and (min-width: 514px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  @media screen and (min-width: 714px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
  }
`;

export default function MyBooksPage({ page }: IProps) {
  return (
    <Container>
      {page.books.map((book) => (
        <MyBooksItem key={book.id} {...book} />
      ))}
    </Container>
  );
}
