import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import HeaderProfileDropdown from './HeaderProfileDropdown';
import { userAtom } from 'recoil/user';
import { IconBurger } from '@style/icons';

const Container = styled.div<{ isHamburger: boolean }>`
  display: flex;
  cursor: pointer;
  height: 100%;
  align-items: center;
`;

const ProfileContainer = styled.div`
  height: 70%;
  width: 5rem;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
  svg {
    width: 20px;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const ProfileImageWrapper = styled.div`
  width: 45%;
  height: 80%;
  border-radius: 5rem;
  background-color: lightblue;
  margin-left: 5px;
  overflow: hidden;
`;

export default function HeaderProfile() {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const handleHamburger = () => {
    setIsHamburger((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsHamburger(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHamburger]);

  return (
    <Container
      isHamburger={isHamburger}
      ref={hamburgerRef}
      onClick={handleHamburger}
    >
      <ProfileContainer>
        <ProfileImageWrapper></ProfileImageWrapper>
        <IconBurger />
      </ProfileContainer>
      {/* <HeaderProfile /> */}
      {isHamburger && <HeaderProfileDropdown />}
    </Container>
  );
}
