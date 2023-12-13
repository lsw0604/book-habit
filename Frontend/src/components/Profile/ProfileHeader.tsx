import styled from 'styled-components';
import Avatar from 'components/common/Avatar';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import useProfileEditMutation from '@queries/profile/useProfileEditMutation';

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: -4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProfileHeader() {
  const { profile } = useRecoilValue(userAtom);
  const formData = new FormData();

  const { mutate, isLoading } = useProfileEditMutation();

  const editProfileHandler = () => {
    const inputElement: HTMLInputElement = document.createElement('input');

    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;
      if (files && files.length > 0) {
        formData.append('profile', files[0]);
        mutate(formData);
      }
    };
    inputElement.click();
  };

  return (
    <Container>
      <Avatar
        src={profile}
        size="140px"
        isLoading={isLoading}
        editProfile={editProfileHandler}
      />
    </Container>
  );
}
