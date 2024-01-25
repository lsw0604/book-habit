import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import {
  useEventListener,
  useIntersectionObserver,
  useUpdateEffect,
} from 'usehooks-ts';

import Skeleton from 'components/common/skeleton';
import ImageWrapper from 'components/common/image-wrapper';
import SearchItemBody from 'components/search/search-item-body';

import { modalAtom } from 'recoil/modal';
import { searchBookAtom } from 'recoil/searchBook';

interface IProps {
  item: KakaoSearchResponseDocumentType;
  search: string;
}

const Container = styled.div`
  width: 100%;
  min-height: 350px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  background-color: ${({ theme }) => theme.mode.sub};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentLoader = styled.div`
  width: 100%;
  height: 100%;

  > div {
    margin-bottom: 0.5rem;
  }
`;

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '10px',
  threshold: 0.1,
};

export default function SearchItem({ item, search }: IProps) {
  const setModalState = useSetRecoilState(modalAtom);
  const setSearchBookState = useSetRecoilState(searchBookAtom);

  const itemRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(itemRef, OBSERVER_OPTION);

  const isVisible = entry?.isIntersecting;

  const [isOpen, setIsOpen] = useState(false);
  const { isbn, thumbnail, ...rest } = item;
  const ISBN = isbn.split(' ');

  const openSearchBookRegisterModal = () => {
    setModalState({ isOpen: true, type: 'registerSearchBook' });
    setSearchBookState({ ...item, isbn: ISBN[1] });
  };

  useEventListener('click', openSearchBookRegisterModal, itemRef);

  useUpdateEffect(() => {
    if (isVisible) {
      setIsOpen(true);
    }
  }, [isVisible]);

  return (
    <Container key={isbn} ref={itemRef}>
      {isOpen ? (
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

SearchItem.Loader = function SearchItemLoader() {
  return (
    <Container>
      <Header>
        <Skeleton width="120px" height="174px" />
      </Header>
      <ContentLoader>
        <Skeleton width="100%" height="20px" />
        <Skeleton width="80%" height="20px" />
        <Skeleton width="90%" height="20px" />
        <Skeleton width="40%" height="20px" />
        <Skeleton width="40%" height="20px" />
      </ContentLoader>
    </Container>
  );
};
