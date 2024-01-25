import Selector from 'components/common/Selector';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const SELECTOR_OPTIONS: SelectorBookType[] = [
  '전체보기',
  '다읽음',
  '읽고싶음',
  '읽는중',
];

const Container = styled.div`
  padding: 1rem;
`;

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

export default function MyBookSelector() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category =
    searchParams.get('category') !== null
      ? searchParams.get('category')
      : undefined;

  const onNavigate = (category?: string) => {
    setSearchParams(`category=${category}`);
  };

  return (
    <Container>
      <Wrapper>
        <Selector
          options={SELECTOR_OPTIONS}
          value={category as string}
          onChange={onNavigate}
        />
      </Wrapper>
    </Container>
  );
}
