import useProfileEditMutation from '@queries/profile/useProfileEditMutation';
import useProfileInfoQuery from '@queries/profile/useProfileInfoQuery';
import { IconFemale, IconMale } from '@style/icons';
import Avatar from 'components/common/Avatar';
import Loader from 'components/common/Loader';
import { METHODS } from 'http';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  border-radius: 2rem 2rem 0 0;
  height: 70%;
  gap: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  @media screen and (min-width: 1280px) {
    max-width: 500px;
  }
`;

const ProfileHeader = styled.div`
  width: 100%;
  position: absolute;
  top: -4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 5rem 2rem 2rem 2rem;
  display: flex;
  justify-content: center;
`;

const Stack = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  padding: 1rem;
  span {
    font-size: 10px;
    color: ${({ theme }) => theme.mode.typo_sub};
  }
  .count {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.main};
  }
`;

const Box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 80px;
`;

const genderObj: Record<'female' | 'male', JSX.Element> = {
  male: <IconMale />,
  female: <IconFemale />,
};

export default function MyProfile() {
  const formData = new FormData();
  const { mutate, isLoading: profileEditIsLoading } = useProfileEditMutation();
  const { profile, age, gender, name } = useRecoilValue(userAtom);
  const { data, isLoading, isFetching } = useProfileInfoQuery();

  const fetchLike = async () => {
    const response = await fetch('http://localhost:3001/api/auth/like', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('ACCESS')}`,
      },
    }).then((res) => res.json());
    console.log(response);

    return response;
  };

  const editPhoto = () => {
    const inputEl: HTMLInputElement = document.createElement('input');
    inputEl.type = 'file';
    inputEl.accept = 'image/*';
    inputEl.onchange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;
      if (files && files.length > 0) {
        formData.append('profile', files[0]);
        mutate(formData);
      }
    };
    inputEl.click();
  };

  fetchLike();
  return (
    <>
      <Container>
        <ProfileHeader>
          <Avatar
            src={profile}
            size="140px"
            isLoading={profileEditIsLoading}
            editProfile={editPhoto}
          />
        </ProfileHeader>
        <ProfileContainer>
          <ProfileContent>
            {isLoading || isFetching ? (
              <Loader />
            ) : (
              <Box>
                <Stack>
                  <span className="count">{data?.books_count}</span>
                  <span>books</span>
                </Stack>
                <Stack>
                  <span className="count">{data?.comments_count}</span>
                  <span>comments</span>
                </Stack>
                <Stack>
                  <span className="count">{data?.likes_count}</span>
                  <span>likes</span>
                </Stack>
              </Box>
            )}
          </ProfileContent>
        </ProfileContainer>
      </Container>
    </>
  );
}
