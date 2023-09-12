import styled from 'styled-components';
import Calendar from 'components/Calendar';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const HomePage = () => {
  return (
    <Container>
      <Calendar />
    </Container>
  );
};

export default HomePage;
