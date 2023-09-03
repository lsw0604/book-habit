import styled from 'styled-components';

interface IProps {
  title: string;
  icon: JSX.Element;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.3rem 0.1rem 0.3rem;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.main};
`;

const Icon = styled.div``;

const Title = styled.div``;

export default function NavBtn({ title, icon }: IProps) {
  return (
    <Container>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </Container>
  );
}
