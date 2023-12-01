import styled from 'styled-components';
import { useState } from 'react';

import Selector from 'components/common/Selector';
import List from 'components/MyBooks/List';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;
`;

const SELECTOR_OPTIONS: SelectorBookType[] = [
  '전체보기',
  '다읽음',
  '읽는중',
  '읽고싶음',
];

export default function Index() {
  const [status, setStatus] = useState<string | undefined>('전체보기');
  return (
    <Container>
      <Wrapper>
        <Selector
          options={SELECTOR_OPTIONS}
          value={status}
          onChange={(e) => setStatus(e)}
        />
      </Wrapper>
      <List status={status} />
    </Container>
  );
}
