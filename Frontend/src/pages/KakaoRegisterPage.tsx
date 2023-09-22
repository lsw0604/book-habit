import styled from 'styled-components';

import KakaoRegister from 'components/user/KakaoRegister';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function KakaoRegisterPage() {
  return (
    <Container>
      <KakaoRegister />
    </Container>
  );
}
