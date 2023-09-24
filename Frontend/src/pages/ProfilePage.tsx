import styled from 'styled-components';
import MyProfile from 'components/user/MyProfile';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProfilePage() {
  return (
    <Container>
      <MyProfile />
    </Container>
  );
}
