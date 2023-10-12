import styled from 'styled-components';
import KakaoRegister from 'components/user/KakaoRegister';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 375px;
  width: 100%;
  height: 100%;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1280px) {
    max-width: 500px;
    border-radius: 10px;
  }
`;

export default function KakaoRegisterPage() {
  return (
    <Container>
      <KakaoRegister />
    </Container>
  );
}
