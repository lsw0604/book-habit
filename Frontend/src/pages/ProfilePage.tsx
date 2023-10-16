import styled from 'styled-components';
import MyProfile from 'components/user/MyProfile';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.spinner};
  height: 100%;
  width: 100%;
  @media screen and (min-width: 1280px) {
    max-width: 500px;
  }
`;

export default function ProfilePage() {
  return (
    <Container>
      <MyProfile />
      <ProfileHeaderBackground />
    </Container>
  );
}
