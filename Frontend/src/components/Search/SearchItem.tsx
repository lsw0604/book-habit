import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useRef, useEffect } from 'react';

import SearchItemHeader from 'components/Search/SearchItemHeader';
import { searchBookAtom } from 'recoil/searchBook';
import ImageWrapper from 'components/common/ImageWrapper';
import useObserverHook from '@hooks/useObserverHook';
import useModalHook from '@hooks/useModalHook';

const Container = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  border: none;
  width: 100%;
  min-height: 350px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
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
}: KakaoSearchResponseDocumentType & {
  search: string;
}) {
  const date = datetime.toString().split('-');
  const ISBN = isbn.split(' ');
  const itemRef = useRef<HTMLDivElement>(null);

  const { setModalState } = useModalHook();
  const setSearchBookState = useSetRecoilState(searchBookAtom);

  const { isVisible } = useObserverHook(itemRef);

  useEffect(() => {
    const onClick = () => {
      setModalState({ isOpen: true, type: 'registerSearchBook' });
      setSearchBookState({
        thumbnail,
        authors,
        publisher,
        contents,
        isbn: ISBN[1],
        price,
        url,
        title,
      });
    };
    if (isVisible) {
      itemRef.current?.addEventListener('click', onClick);
    }

    return () => {
      itemRef.current?.removeEventListener('click', onClick);
    };
  }, [isVisible]);

  return (
    <Container key={isbn} ref={itemRef}>
      {isVisible ? (
        <>
          <Header>
            <ImageWrapper
              src={thumbnail}
              alt={title}
              width={120}
              height={174}
            />
          </Header>
          <Content>
            <SearchItemHeader title={title} query={search} />
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
              판매가{' '}
              <P style={{ textDecorationLine: 'line-through' }}>{price}</P>/
              <P>{sale_price}</P>
            </Stack>
            <Stack>
              판매상태 <P>{status}</P>
            </Stack>
            <Stack>
              출판<P>{`${date[0]}년 ${date[1]}월`}</P>
            </Stack>
          </Content>
        </>
      ) : null}
    </Container>
  );
}
