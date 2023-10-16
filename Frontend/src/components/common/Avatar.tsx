import styled from 'styled-components';
import { v4 } from 'uuid';
import Loader from './Loader';

interface IProps {
  size: string;
  src?: string;
  editProfile?: () => void;
  isLoading?: boolean;
}

const Container = styled.div<{ size: string }>`
  width: ${({ size }) => `${size}`};
  height: ${({ size }) => `${size}`};
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.nav};
  box-shadow: ${({ theme }) => theme.shadow.xl};
`;

const ProfileWrapper = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
`;

/**
 * * size는 px, em, rem 단위를 정한 값을 기입해주세요.
 */
export default function Avatar({ size, src, editProfile, isLoading }: IProps) {
  return (
    <Container size={size} onClick={editProfile}>
      <ProfileWrapper>
        {!isLoading ? (
          <img key={`profile/${v4()}`} src={src} alt={src} loading="lazy" />
        ) : (
          <Loader />
        )}
      </ProfileWrapper>
    </Container>
  );
}
