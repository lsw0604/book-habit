import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-bottom: 8px;
  gap: 1rem;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  border: none;
  margin: 0;
  padding: 0;
  height: 240px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 5px;
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
`;

const InfoWrapper = styled.div`
  width: auto;
`;

const Heading = styled.h1`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const Rank = styled.span`
  color: ${({ theme }) => theme.colors.main};
`;

const Span = styled.span`
  font-size: 8px;
  line-height: 10px;
  width: 100%;
  display: inline-flex;
  font-weight: 400;
  overflow: hidden;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const P = styled.p`
  font-size: 10px;
  line-height: 12px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Item = ({
  author,
  company,
  title,
  image,
  isbn,
  price,
  ranking,
}: BooksType) => {
  return (
    <Container>
      <Wrapper>
        <img src={image} alt={isbn} />
      </Wrapper>
      <InfoWrapper>
        <Heading>
          <Rank>{ranking} </Rank>
          {title}
        </Heading>

        <Span>
          <P>{author}</P>/<P>{company}</P>/<P>{price}</P>
        </Span>
      </InfoWrapper>
    </Container>
  );
};

export default Item;
