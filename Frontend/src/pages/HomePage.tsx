import styled from 'styled-components';
import { useState } from 'react';

import SearchBox from 'components/Search/SearchBox';
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
  const options = [
    { label: 'test', value: 'test1' },
    { label: 'test2', value: 'test2' },
    { label: 'test3', value: 'test3' },
    { label: 'test4', value: 'test4' },
    { label: 'test5', value: 'test5' },
    { label: 'test6', value: 'test6' },
  ];

  const [multiValue, setMultiValue] = useState<SelectorOptionType[]>([]);
  const [singleValue, setSingleValue] = useState<
    SelectorOptionType | undefined
  >(undefined);

  return (
    <Container>
      <Content>
        {/* <SearchBox /> */}
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
