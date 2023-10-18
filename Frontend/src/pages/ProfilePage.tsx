import styled from 'styled-components';
import ProfileHeader from 'components/user/Profile/ProfileHeader';
import ProfileDescription from 'components/user/Profile/ProfileDescription';
import ProfileList from 'components/user/Profile/ProfileList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  border-radius: 2rem 2rem 0 0;
  height: 90%;
  gap: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  @media screen and (min-width: 1280px) {
    max-width: 500px;
  }
`;

const ProfileContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
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
      <ProfileContainer>
        <ProfileHeader />
        <ProfileContent>
          <ProfileDescription />
          <ProfileList />
        </ProfileContent>
      </ProfileContainer>
      <ProfileHeaderBackground />
    </Container>
  );
}
