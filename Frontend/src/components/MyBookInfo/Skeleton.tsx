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
  background-color: rgba(150, 150, 150, 0.1);
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function Skeleton() {
  return (
    <Container>
      <Stack>책 상태를 업데이트해주세요.</Stack>
    </Container>
  );
}
