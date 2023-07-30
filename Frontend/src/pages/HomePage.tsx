import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';

import Ranking from 'components/Rank/List';
import CheckBoxGroup from 'components/common/CheckBox';
import RadioGroup from 'components/common/Radio';
import { CheckBoxOptionType } from 'types/style';
import { IconBeach } from '@style/icons';
import Selector from 'components/common/Selector';

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

const HomePage = () => {
  const [value, setValue] = useState<CheckBoxOptionType<number>[]>([]);
  const [option, setOption] = useState<string>('');
  const [select, setSelect] = useState<number>(0);

  const options = [
    {
      title: 1,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 2,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 3,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 4,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 5,
    },
  ];

  useEffect(() => {
    console.log('value', option);
  }, [option]);

  const onChangeSelector = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelect(parseInt(event.target.value));
  };

  return (
    <Container>
      <Heading>베스트 셀러 100</Heading>
      <Content>
        <Selector<number>
          disabledOptions={[0]}
          options={[1, 2, 3, 4]}
          label="test"
          value={select}
          onChange={onChangeSelector}
        />
        <RadioGroup<string>
          label="test"
          options={[
            { label: 'test!', value: 'test1', icon: <IconBeach /> },
            { label: 'test2', value: 'test2', description: 'ss' },
            { label: 'test3', value: 'test3', description: 'ss' },
            { label: 'test4', value: 'test4', description: 'ss' },
            { label: 'test5', value: 'test5', description: 'ss' },
            { label: 'test6', value: 'test6', description: 'ss' },
            { label: 'test7', value: 'test7', description: 'ss' },
            { label: 'test8', value: 'test8', description: 'ss' },
          ]}
          value={option}
          onChange={(e) => setOption(e)}
        />
        <CheckBoxGroup<number>
          label="test"
          value={value}
          options={options}
          onChange={(e) => setValue(e)}
        />
        <Ranking />
      </Content>
    </Container>
  );
};

export default HomePage;
