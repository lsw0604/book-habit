import Button from 'components/common/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  width: 50%;
  position: relative;
`;

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>책벌래</Title>
      <ButtonWrapper>
        <Button onClick={() => navigate('/search')}>시작하기</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default HomePage;
