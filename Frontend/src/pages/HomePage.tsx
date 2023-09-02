import styled from 'styled-components';
import Calendar from 'components/common/Calendar';

const Container = styled.div`
  width: 100%;
  height: auto;
  flex: 1;
`;

const HomePage = () => {
  return (
    <Container>
      <Calendar />
    </Container>
  );
};

export default HomePage;
