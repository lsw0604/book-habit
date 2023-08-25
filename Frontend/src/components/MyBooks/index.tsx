import styled from 'styled-components';
import { useState } from 'react';

import Selector from 'components/common/Selector';
import List from 'components/MyBooks/List';

const Container = styled.div`
  width: 100%;
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
      <Selector
        label="내 책 상태에 따라 서재에 보여지는게 달라요"
        options={options}
        value={status}
        onChange={(e) => setStatus(e)}
      />
      <List status={status} />
    </Container>
  );
}
