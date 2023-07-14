import styled from 'styled-components';

interface IProps {
  onClick: () => void;
}

const Container = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  &::before {
    position: absolute;
    content: '';
    height: 25px;
    width: 25px;
    bottom: 2.6px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background-color: #00c853;
  }

  &:checked + span::before {
    transform: translateX(29px);
  }
`;

const Background = styled.span`
  position: absolute;
  cursor: pointer;
  inset: 0 0 0 0;
  background-color: #2c3e50;
  transition: 0.3s;
  border-radius: 30px;
`;

export default function Index() {
  return (
    <Container>
      <Input type="checkbox" />
      <Background />
    </Container>
  );
}
