import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
`;

const HomePage = () => {
  return (
    <Container>
      <Page>
        <h1 style={{ fontSize: '40px' }}>책벌래?는</h1>
        <h2>책벌레와</h2>
        <h2>보다의 용언의 어간인 보-와</h2>
        <h2> 의지를 나타내는 어미 -래의 결합 형태인 볼래의</h2>
        <h1>합성어 입니다.</h1>
      </Page>
      <Page>
        <h3>책벌레 처럼 아니더라도 꾸준히 읽고 기록하다 보면</h3>
        <h3>습관처럼 굳게 될거니까요</h3>
      </Page>
      <Page>
        <h3>책볼레는 완독이 아니더라도</h3>
        <h3>읽지도 않았더라도</h3>
        <h3>한글자 읽었더라도</h3>
        <h3>의지를 나타내는 어미 -래 처럼</h3>
        <h3>하고자 하는 마음을 중요하게 생각합니다.</h3>
      </Page>
      <Page>
        <h3>간단한 회원가입으로 로그인해서 책볼래를 이용해 주세요.</h3>
      </Page>
    </Container>
  );
};

export default HomePage;
