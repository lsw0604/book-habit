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
  const [value, setValue] = useState<{ title: string; description?: string }[]>(
    []
  );

  const options = [
    {
      title: 'Ipsum 1',
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 'Ipsum 2',
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 'Ipsum 3',
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 'Ipsum 4',
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 'Ipsum 5',
    },
  ];

  useEffect(() => {
    console.log('value', value);
  }, [value, setValue]);

  const onChange = (ctx: { title: string; description?: string }[]) => {
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
