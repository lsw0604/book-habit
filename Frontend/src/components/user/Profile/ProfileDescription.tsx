import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
import { IconFemale, IconMale, IconPencil } from '@style/icons';
import { customize } from '@style/colors';
import { modalAtom } from 'recoil/modal';

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
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
    svg {
      height: 16px;
    }
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

const genderObj: Record<'female' | 'male', JSX.Element> = {
  male: <IconMale />,
  female: <IconFemale />,
};

export default function ProfileDescription() {
  const { name, gender, email, age } = useRecoilValue(userAtom);
  const setModalState = useSetRecoilState(modalAtom);

  return (
    <Container>
      <p className="name">
        {name}&nbsp;
        <IconPencil
          onClick={() => setModalState({ isOpen: true, type: 'modifyProfile' })}
        />
      </p>
      <p className="email">{email}</p>
      <p className="age">
        {genderObj[gender as 'female' | 'male']}
        {age}
      </p>
    </Container>
  );
}
