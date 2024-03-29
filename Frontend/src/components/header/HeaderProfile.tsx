import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'recoil/user';
import Avatar from 'components/common/Avatar';
import HeaderProfileDropdown from 'components/header/HeaderProfileDropdown';

const Container = styled.div<{ isHamburger: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const ProfileName = styled.p`
  color: ${({ theme }) => theme.colors.spinner};
  display: inline-flex;
`;

export default function HeaderProfile() {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);

  const hamburgerRef = useRef<HTMLDivElement>(null);
  const { profile, name } = useRecoilValue(userAtom);

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
      {name ? (
        <>
          <ProfileName>{name}</ProfileName>님 환영합니다.
        </>
      ) : null}
      <Avatar src={profile} size="3rem" />
      {isHamburger && <HeaderProfileDropdown />}
    </Container>
  );
}
