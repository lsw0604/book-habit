import styled from 'styled-components';
import { useState } from 'react';

import SelectorBox from 'components/common/Selector';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
`;

const HomePage = () => {
  const options = ['test', 'test2', 'test3', 'test4', 'test5', 'test6'];

  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [singleValue, setSingleValue] = useState<string | undefined>(undefined);

  return (
    <Container>
      <Content>
        <SelectorBox
          label="싱글"
          options={options}
          value={singleValue}
          onChange={(e) => setSingleValue(e)}
        />
        <br />
        <SelectorBox
          multiple
          label="멀티"
          options={options}
          value={multiValue}
          onChange={(e) => setMultiValue(e)}
        />
      </Content>
    </Container>
  );
};

export default HomePage;
