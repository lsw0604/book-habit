import { useState, ChangeEvent, useRef, useEffect } from 'react';
import styled from 'styled-components';

import useDebounce from 'lib/utils/useDebounce';
import Loader from 'components/common/Loader';
import Input from 'components/common/Input';
import { IconImage } from '@style/icons';
import useSearchHook from '@hooks/useSearchHook';
import { customize } from '@style/colors';
import Button from 'components/common/Button';

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  .loader {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }

  .observer {
    margin-bottom: 20px;
  }
`;

const Box = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 0.75rem;
  flex-direction: column;
  width: 100%;
  display: flex;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Loading = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1rem;
`;

const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  .Container {
    width: 100%;
    min-width: 150px;
    margin-bottom: 8px;
    gap: 1rem;
  }

  .img-wrapper {
    background-color: ${customize.gray['300']};
    border: none;
    border-radius: 5px;
    margin: 0;
    padding: 0;
    height: 240px;
    min-width: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      border-radius: 5px;
      object-fit: fill;
      width: 100%;
      height: 100%;
    }
  }

  .icon {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    svg {
      width: 2rem;
      fill: ${({ theme }) => theme.mode.typo_sub};
    }
  }
`;

export default function Search() {
  const [search, setSearch] = useState('');

  const debounceSearchInput = useDebounce(search, 1000);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const lastSearchRef = useRef<HTMLDivElement>(null);

  const { data, refetch, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useSearchHook(debounceSearchInput);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }, observerOptions);

    if (lastSearchRef.current) {
      observer.observe(lastSearchRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  useEffect(() => {
    console.log('search', search);
  }, [search]);

  return (
    <>
      <Box>
        <Stack>
          <Input value={search} onChange={onChange} />
        </Stack>
        <Button onClick={() => console.log(search)}>search</Button>
      </Box>
      {search}
      {isLoading && (
        <Container>
          <Loading>
            <Loader size={2} />
          </Loading>
        </Container>
      )}
      <Wrapper>
        {data?.pages.map((page, i) => (
          <Page key={i}>
            {page.documents.map((document) => (
              <div key={document.isbn} className="container">
                <div className="img-wrapper">
                  {document.thumbnail ? (
                    <img src={document.thumbnail} alt={document.isbn} />
                  ) : (
                    <div>
                      <div className="icon">
                        <IconImage />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Page>
        ))}
        {isFetching ? (
          <div className="loader">
            <Loader />
          </div>
        ) : !hasNextPage ? null : (
          <div ref={lastSearchRef} className="observer" />
        )}
      </Wrapper>
    </>
  );
}
