import styled from 'styled-components';

import { IconImage } from '@style/icons';
import SearchItemHeader from 'components/Search/SearchItemHeader';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import { bottomSheetAtom } from 'recoil/bottomSheet';

const Container = styled.button`
  background-color: ${({ theme }) => theme.mode.sub};
  border: none;
  width: 100%;
  height: auto;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  min-width: 120px;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 5px;
    object-fit: fill;
    width: 100%;
    height: auto;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Span = styled.span`
  font-size: 10px;
  line-height: 12px;
  width: 100%;
  display: inline-flex;
  gap: 8px;
  font-weight: 700;
  overflow: hidden;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const P = styled.p`
  font-size: 10px;
  line-height: 12px;
  font-weight: 400;
  overflow: hidden;
`;

export default function SearchItem({
  authors,
  datetime,
  isbn,
  price,
  publisher,
  sale_price,
  status,
  thumbnail,
  title,
  translators,
  search,
  contents,
  url,
}: KakaoSearchResponseDocumentType & { search: string }) {
  const date = datetime.toString().split('-');

  const ISBN = isbn.split(' ');

  const modalSetState = useSetRecoilState(modalAtom);
  const bottomSheetSetState = useSetRecoilState(bottomSheetAtom);

  return (
    <Container
      onClick={() => {
        modalSetState({ isOpen: true });
        bottomSheetSetState({
          image: thumbnail ? thumbnail : '',
          authors,
          publisher,
          contents,
          isbn: ISBN[1],
          price,
          url,
          title,
        });
      }}
    >
      <Header>
        <ImageWrapper>
          {thumbnail ? <img alt={isbn} src={thumbnail} /> : <IconImage />}
        </ImageWrapper>
      </Header>
      <InfoWrapper>
        <SearchItemHeader title={title} query={search} />
        <Span>
          출판사 <P>{publisher}</P>
        </Span>
        <Span>
          작가
          {authors && authors.map((author) => <P key={author}>{author}</P>)}
        </Span>
        <Span>
          번역
          {translators.length !== 0 ? (
            translators.map((v) => <P key={v}>{v}</P>)
          ) : (
            <P>미상</P>
          )}
        </Span>
        <Span>
          판매가 <P style={{ textDecorationLine: 'line-through' }}>{price}</P>/
          <P>{sale_price}</P>/<P>{status}</P>
        </Span>
        <Span>
          출판<P>{`${date[0]}년 ${date[1]}월`}</P>
        </Span>
      </InfoWrapper>
    </Container>
  );
}
