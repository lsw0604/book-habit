import styled from 'styled-components';

interface IProps {
  title: string;
  query: string;
}

const Container = styled.h1`
  font-size: 18px;
  line-height: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.mode.typo_sub};
  margin-bottom: 8px;
  float: left;
  text-align: start;
`;

const Highlighted = styled.div`
  color: ${({ theme }) => theme.colors.main};
  display: inline-flex;
`;

export default function SearchItemHeader({ title, query }: IProps) {
  const regExp = new RegExp(`(${query})`, 'gi');

  if (query !== '' && title.includes(query)) {
    const splitTitle = title.split(regExp);

    return (
      <Container>
        {splitTitle.map((word, index) =>
          word === query ? <Highlighted key={index}>{word}</Highlighted> : word
        )}
      </Container>
    );
  }

  return <Container>{title}</Container>;
}
