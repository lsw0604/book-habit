import styled from 'styled-components';
import Register from 'components/user/Register';
// import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  box-sizing: border-box;
  overflow: scroll;
`;

// const HELMET_PROVIDER_OPTIONS = {
//   title: '회원가입',
//   description: '책벌래의 회원가입을 하는 페이지 입니다.',
// };

export default function RegisterPage() {
  return (
    <>
      {/* <HelmetProvider {...HELMET_PROVIDER_OPTIONS} /> */}
      <Container>
        <Register />
      </Container>
    </>
  );
}
