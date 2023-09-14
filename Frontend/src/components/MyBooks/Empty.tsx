import styled from 'styled-components';

interface IProps {
  status?: string;
}

const Container = styled.div`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  height: auto;
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

export default function Empty({ status }: IProps) {
  const statusMessageHandler = (status?: string) => {
    switch (status) {
      case '다읽음':
        return '최근에 기록된 책중에 다 읽음으로';
      case '전체보기':
        return '서재에 ';
      case '읽고싶음':
        return '최근에 기록된 책중에 읽고싶음으로 ';
      case '읽는중':
        return '최근에 기록된 책중에 읽는중으로';
      default:
        null;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Content>{statusMessageHandler(status)}</Content>
        <Content>기록된 책이 없습니다.</Content>
        <Content>재밌게 읽었거나</Content>
        <Content>재밌게 읽는중이거나</Content>
        <Content>읽고싶은 책을</Content>
        <Content>추가해주세요</Content>
      </Wrapper>
    </Container>
  );
}
