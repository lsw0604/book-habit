import { IconImage } from '@style/icons';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  position: relative;
  gap: 1rem;
  border: 2px solid red;
`;

const ImageWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  min-height: 160px;
  min-width: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 5px;
    object-fit: fill;
    width: 100%;
    height: 100%;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const InfoWrapper = styled.div`
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.mode.typo_sub};
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
`;

export default function SearchItem({
  authors,
  contents,
  datetime,
  isbn,
  price,
  publisher,
  sale_price,
  status,
  thumbnail,
  title,
  translators,
  url,
}: KakaoSearchResponseDocumentType) {
  const date = datetime.toString().split('T')[0];
  return (
    <Container>
      <ImageWrapper>
        {thumbnail ? <img alt={isbn} src={thumbnail} /> : <IconImage />}
      </ImageWrapper>
      <InfoWrapper>
        <Heading>{title}</Heading>
        <Span>
          <P>{publisher}</P>/
          {translators.map((v) => (
            <P key={v}>{v}</P>
          ))}
        </Span>
        <Span>
          <P>{price}</P>/<P>{sale_price}</P>
        </Span>
        <Span>{date}</Span>
      </InfoWrapper>
    </Container>
  );
}
