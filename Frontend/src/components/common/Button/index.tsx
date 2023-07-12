import styled from 'styled-components';

const Container = styled.button<{ icon?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 0;
  font-family: 'SUIT';
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.icon ? '0 4rem' : '0 2rem')};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
}

export default function Index({ icon, children, ...props }: IProps) {
  return (
    <Container {...props} icon={icon}>
      <Icon>{children}</Icon>
    </Container>
  );
}
