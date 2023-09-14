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
`;

export default function Index() {
  const options: SelectorBookType[] = [
    '전체보기',
    '다읽음',
    '읽는중',
    '읽고싶음',
  ];

  const [status, setStatus] = useState<string | undefined>('전체보기');

  return (
    <Container>
      <Wrapper>
        <Selector
          label="내 서재에 등록된 책의 기록에 따라 보여지는게 달라요"
          options={options}
          value={status}
          onChange={(e) => setStatus(e)}
        />
      </Wrapper>
      <List status={status} />
    </Container>
  );
}
