import { customize } from '@style/colors';
import Button from 'components/common/Button';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const HomePage = () => {
  return (
    <Container>
      <div>서재에 가장많이 등록된 책</div>
      <div>좋아요가 많이 달린 코멘트</div>
    </Container>
  );
};

export default HomePage;
