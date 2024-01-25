import styled from 'styled-components';
import dayjs from 'dayjs';

import SearchItemHeader from 'components/search/search-item-header';

interface IProps {
  content: Omit<
    KakaoSearchResponseDocumentType,
    'contents' | 'url' | 'isbn' | 'thumbnail'
  >;
  search: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Stack = styled.div`
  font-size: 10px;
  line-height: 12px;
  width: 100%;
  display: inline-flex;
  gap: 8px;
  font-weight: 700;
  overflow: hidden;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const P = styled.p<{ text_decorate?: boolean }>`
  font-size: 10px;
  line-height: 12px;
  overflow: hidden;
  text-decoration: ${({ text_decorate }) => text_decorate && 'line-through'};
`;

export default function SearchItemBody({ content, search }: IProps) {
  const {
    authors,
    datetime,
    price,
    publisher,
    sale_price,
    status,
    title,
    translators,
  } = content;

  const date = dayjs(datetime).format('YYYY년 MM월');

  return (
    <Container>
      <SearchItemHeader title={title} search={search} />
      <Stack>
        출판사 <P>{publisher}</P>
      </Stack>
      <Stack>
        작가
        {authors && authors.map((author) => <P key={author}>{author}</P>)}
      </Stack>
      <Stack>
        번역
        {translators.length !== 0 ? (
          translators.map((v) => <P key={v}>{v}</P>)
        ) : (
          <P>미상</P>
        )}
      </Stack>
      <Stack>
        판매가 <P text_decorate>{price}</P>/<P>{sale_price}</P>
      </Stack>
      <Stack>
        판매상태 <P>{status}</P>
      </Stack>
      <Stack>
        출판<P>{date}</P>
      </Stack>
    </Container>
  );
}
