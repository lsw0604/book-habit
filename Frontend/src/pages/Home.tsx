import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Ranking from 'components/Rank/List';
import CheckBoxGroup from 'components/common/CheckBoxGroup';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0.5rem;
`;

const Heading = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 40px;
  font-weight: bold;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
`;

export default function Home() {
  const [value, setValue] = useState<string[]>([]);

  const options = ['male', 'female'];

  useEffect(() => {
    console.log(value);
  }, [value, setValue]);

  const onChange = (ctx: string[]) => {
    setValue([...ctx]);
  };
  return (
    <Container>
      <Heading>베스트 셀러 100</Heading>
      <Content>
        {/* <Ranking /> */}
        <CheckBoxGroup value={value} options={options} onChange={onChange} />
      </Content>
    </Container>
  );
}
