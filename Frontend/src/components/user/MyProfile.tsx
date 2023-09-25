import useProfileEditMutation from '@queries/profile/useProfileEditMutation';
import useProfileInfoQuery from '@queries/profile/useProfileInfoQuery';
import { IconFemale, IconMale } from '@style/icons';
import Avatar from 'components/common/Avatar';
import Loader from 'components/common/Loader';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 375px;
  width: 100%;
  border-radius: 1rem;
  height: 50%;
  gap: 1rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  @media screen and (min-width: 1280px) {
    max-width: 500px;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.mode.typo_sub};
  }
  .name {
    font-size: 30px;
    color: ${({ theme }) => theme.mode.typo_main};
    svg {
      height: 30px;
      margin: 0 8px;
      fill: ${({ theme }) => theme.mode.typo_sub};
    }
  }
`;

const ProfileContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  return (
    <Container>
      <ProfileHeader>
        <Avatar
          src={profile}
          size="110px"
          isLoading={profileEditIsLoading}
          editProfile={editPhoto}
        />
        <span className="name">
          {name}
          {genderObj[gender as 'female' | 'male']}
          {age}
        </span>
        <span>프로필 사진을 수정하시려면 프로필 사진을 눌러주세요.</span>
      </ProfileHeader>
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
    </Container>
  );
}
