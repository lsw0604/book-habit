import styled from 'styled-components';

import KakaoRegister from 'components/user/KakaoRegister';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export default function KakaoRegisterPage() {
  return (
    <>
      <Container>
        <KakaoRegister />
      </Container>
    </>
  );
}
