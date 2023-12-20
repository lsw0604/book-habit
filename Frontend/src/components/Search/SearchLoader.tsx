import styled from 'styled-components';

interface IProps {
  height?: string;
}

import Loader from 'components/common/Loader';

const Container = styled.div<{ height?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => (height ? height : 'auto')};
  width: 100%;
`;

export default function SearchLoader({ height }: IProps) {
  return (
    <Container height={height}>
      <Loader size={3} />
    </Container>
  );
}
