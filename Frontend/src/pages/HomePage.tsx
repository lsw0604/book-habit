import { LogoMain } from '@style/icons';
import Loader from 'components/common/Loader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  svg {
    width: 10rem;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('search');
    }, 1000);
  }, []);

  return (
    <Container>
      <LogoWrapper>
        <LogoMain />
      </LogoWrapper>
      <SubTitle>부담없이 기록하는 독서기록장</SubTitle>
      <Title>책벌래</Title>
      <LoaderWrapper>
        <Loader size={2} />
      </LoaderWrapper>
    </Container>
  );
};

export default HomePage;
