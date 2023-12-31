import styled from 'styled-components';

interface IProps {
  search?: string;
}

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.span`
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const HighLight = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.sub};
`;

export default function SearchSkeleton({ search }: IProps) {
  return (
    <Container>
      <BackGround>
        {search && (
          <Message>
            <HighLight>{search}</HighLight>에 대한 검색 결과가 없습니다.
          </Message>
        )}
        {!search && <Message>책 제목을 검색해주세요.</Message>}
      </BackGround>
    </Container>
  );
}
