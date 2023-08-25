import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: calc(100vh - 15rem);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  gap: 3rem;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
`;

export default function Empty() {
  return (
    <Container>
      <Wrapper>
        <Content>서재에 등록된 책이 없습니다.</Content>
        <Content>재밌게 읽었거나</Content>
        <Content>재밌게 읽는중이거나</Content>
        <Content>읽고싶은 책을</Content>
        <Content>추가해주세요</Content>
      </Wrapper>
    </Container>
  );
}
