import { useState, ChangeEvent } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import useDebounce from 'lib/utils/useDebounce';
import Loader from 'components/common/Loader';
import Input from 'components/common/Input';
import Item from 'components/Rank/Item';

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface ISearchList {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default function Search() {
  const [search, setSearch] = useState('');

  const debounceSearchInput = useDebounce(search, 1000);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const fetchApi = async (query: string) => {
    return await fetch(`https://dummyjson.com/products/search?q=${query}`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Credential': 'true',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }).then((res) => res.json());
  };

  const { data, isLoading } = useQuery<ISearchList>(
    ['SEARCH_LIST', debounceSearchInput],
    () => fetchApi(debounceSearchInput),
    {
      enabled: debounceSearchInput !== '',
    }
  );

  return (
    <>
      <Container>
        <div style={{ marginBottom: '10px', height: '100%' }}>
          <Input value={search} onChange={onChange} />
        </div>
        {isLoading ? (
          debounceSearchInput === '' ? (
            <Wrapper>no result</Wrapper>
          ) : (
            <Loader size={2} />
          )
        ) : data ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '8px',
            }}
          >
            {data.products.map((product) => (
              <Item
                ranking={product.id}
                company={product.category}
                isbn={product.id.toString()}
                key={product.id.toString()}
                image={product.thumbnail}
                title={product.title}
                author={product.stock.toString()}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <div>no result</div>
        )}
      </Container>
    </>
  );
}
