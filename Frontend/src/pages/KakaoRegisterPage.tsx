import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import KakaoRegister from 'components/user/KakaoRegister';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export default function KakaoRegisterPage() {
  return (
    <Container>
      <KakaoRegister />
    </Container>
  );
}
