import styled from 'styled-components';
import { useEffect } from 'react';

import MyBookInfo from 'components/MyBookInfo';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function MyBookInfoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <MyBookInfo />
    </Container>
  );
}
