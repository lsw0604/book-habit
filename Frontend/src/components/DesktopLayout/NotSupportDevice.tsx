import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: auto;
  @media screen and (min-width: 320px) and (min-height: 600px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  padding-top: 15rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  height: calc(100% - 15rem);
  background-color: white;
  overflow: hidden;
`;

const Text = styled.span`
  font-family: 'SUIT';
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;

export default function NotSupportDevice() {
  return (
    <Container>
      <Wrapper>
        <Text>
          화면을 지원하지 않는 기기 입니다. <br /> 다른 기기에서 접속해 주세요.{' '}
        </Text>
      </Wrapper>
    </Container>
  );
}
