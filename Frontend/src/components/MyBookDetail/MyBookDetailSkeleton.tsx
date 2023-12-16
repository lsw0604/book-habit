import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
`;

const Stack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function MyBookDetailSkeleton() {
  return (
    <Container>
      <Stack>등록할 유형을 골라주세요.</Stack>
    </Container>
  );
}
