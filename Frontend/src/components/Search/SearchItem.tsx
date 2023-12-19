import { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';

import { modalAtom } from 'recoil/modal';
import { searchBookAtom } from 'recoil/searchBook';
import ImageWrapper from 'components/common/ImageWrapper';
import SearchItemBody from 'components/Search/SearchItemBody';
import useObserverHook from '@hooks/useObserverHook';

interface IProps {
  item: KakaoSearchResponseDocumentType;
  search: string;
}

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
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

export default function SearchItem({ item, search }: IProps) {
  const { isbn, thumbnail, ...rest } = item;

  const itemRef = useRef<HTMLDivElement>(null);

  const ISBN = isbn.split(' ');

  const setModalState = useSetRecoilState(modalAtom);
  const setSearchBookState = useSetRecoilState(searchBookAtom);

  const { isVisible } = useObserverHook(itemRef);

  const modalHandler = useCallback((type: ModalAtomType['type']) => {
    setModalState({ isOpen: true, type });
  }, []);

  const onClick = () => {
    modalHandler('registerSearchBook');
    setSearchBookState({ ...item, isbn: ISBN[1] });
  };

  useEffect(() => {
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
            <ImageWrapper src={thumbnail} alt={v4()} width={120} height={174} />
          </Header>
          <SearchItemBody content={rest} search={search} />
        </>
      ) : null}
    </Container>
  );
}
