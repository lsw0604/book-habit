import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.mode.main};
  border: none;
  margin: 0;
  padding: 0;
`;

export default function Item({
  author,
  company,
  title,
  image,
  isbn,
  price,
  ranking,
}: BooksType) {
  const [isOpen, isSetOpen] = useState(false);

  const openHandler = () => {
    isSetOpen((prev) => !prev);
  };

  return (
    <Container>
      <Button onClick={openHandler}>
        <img src={image} alt={isbn} />
      </Button>
      {!isOpen ? (
        <></>
      ) : (
        <>
          <h1>{title}</h1>
          <span>
            <p>{ranking}</p>
            <p>{author}</p>
            <p>{company}</p>
            <p>{price}</p>
          </span>
        </>
      )}
    </Container>
  );
}
