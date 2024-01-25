import styled from 'styled-components';
import { v4 } from 'uuid';

interface SearchItemHeaderProps {
  title: string;
  search: string;
}

const Container = styled.div`
  width: 100%;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: ${({ theme }) => theme.mode.typo_sub};
  margin-bottom: 8px;
  float: left;
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Highlighted = styled.div`
  color: ${({ theme }) => theme.colors.main};
  display: inline-flex;
`;

export default function SearchItemHeader({
  title,
  search,
}: SearchItemHeaderProps) {
  const regExp = new RegExp(`(${search})`, 'gi');

  if (search !== '' && title.includes(search)) {
    const splitTitle = title.split(regExp);

    return (
      <Container>
        {splitTitle.map((word) =>
          regExp.test(word) ? (
            <Highlighted key={v4()}>{word}</Highlighted>
          ) : (
            word
          )
        )}
      </Container>
    );
  }

  return <Container>{title}</Container>;
}
