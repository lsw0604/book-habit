import styled from 'styled-components';
import { useState } from 'react';

import Selector from 'components/common/Selector';
import MyBooksList from 'components/MyBooks/MyBooksList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 1rem;
`;

const Box = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const SELECTOR_OPTIONS: SelectorBookType[] = [
  '전체보기',
  '다읽음',
  '읽는중',
  '읽고싶음',
];

export default function MyBooks() {
  const [status, setStatus] = useState<string | undefined>('전체보기');
  return (
    <Container>
      <Wrapper>
        <Box>
          <Selector
            options={SELECTOR_OPTIONS}
            value={status}
            onChange={(e) => setStatus(e)}
          />
        </Box>
      </Wrapper>
      <MyBooksList status={status} />
    </Container>
  );
}
