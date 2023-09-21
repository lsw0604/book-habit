import { IconBurger } from '@style/icons';
import styled from 'styled-components';

const Container = styled.div`
  height: 70%;
  width: 5rem;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
  svg {
    width: 20px;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const ImageWrapper = styled.div`
  width: 45%;
  height: 80%;
  border-radius: 5rem;
  background-color: lightblue;
  margin-left: 5px;
  overflow: hidden;
`;

export default function HeaderProfile() {
  return (
    <Container>
      <ImageWrapper></ImageWrapper>
      <IconBurger />
    </Container>
  );
}
