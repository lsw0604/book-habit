import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import { IconFemale, IconMale } from '@style/icons';
import { customize } from '@style/colors';
import ProfileList from './ProfileList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  flex-direction: column;
  gap: 8px;
  svg {
    height: 20px;
    margin-right: 8px;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }

  .name {
    font-size: 20px;
    color: ${({ theme }) => theme.mode.typo_main};
  }
  .email {
    font-size: 12px;
    color: ${customize.gray['400']};
  }

  .age {
    display: flex;
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    color: ${({ theme }) => theme.mode.typo_main};
  }
`;

export default function ProfileDescription() {
  const { name, gender, email, age } = useRecoilValue(userAtom);

  const genderObj: Record<'female' | 'male', JSX.Element> = {
    male: <IconMale />,
    female: <IconFemale />,
  };

  return (
    <Container>
      <Description>
        <p className="name">{name}</p>
        <p className="email">{email}</p>
        <p className="age">
          {genderObj[gender as 'female' | 'male']}
          {age}
        </p>
      </Description>
      <ProfileList />
    </Container>
  );
}
