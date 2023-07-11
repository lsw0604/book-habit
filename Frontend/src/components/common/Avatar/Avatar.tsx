import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  flex-shrink: 0;
`;

export default function Avatar() {
  return (
    <Container>
      <div className="image"></div>
    </Container>
  );
}
