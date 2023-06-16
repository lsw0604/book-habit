import { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Input = styled.input``;

const Index = () => {
  return (
    <Container>
      <Input />
    </Container>
  );
};

const LabelInput = memo(Index);

export default LabelInput;
