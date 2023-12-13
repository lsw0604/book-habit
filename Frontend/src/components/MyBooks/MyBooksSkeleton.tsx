import Loader from 'components/common/Loader';
import styled from 'styled-components';

interface IProps {
  isLoading?: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  gap: 3rem;
`;

const Span = styled.span`
  width: 100%;
  text-align: center;
`;

export default function MyBooksSkeleton({ isLoading }: IProps) {
  if (isLoading)
    return (
      <Container>
        <Background>
          <Loader size={2} />
        </Background>
      </Container>
    );

  return (
    <Container>
      <Background>
        <Wrapper>
          <Span>서재에</Span>
          <Span>기록된 책이 없습니다.</Span>
          <Span>재밌게 읽었거나</Span>
          <Span>재밌게 읽는중이거나</Span>
          <Span>읽고싶은 책을</Span>
          <Span>추가해주세요</Span>
        </Wrapper>
      </Background>
    </Container>
  );
}
