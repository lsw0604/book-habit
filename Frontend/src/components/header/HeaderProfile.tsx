import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import HeaderProfileDropdown from './HeaderProfileDropdown';
import { userAtom } from 'recoil/user';

const Container = styled.div<{ isHamburger: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  .img_horizon {
    width: 85%;
    height: 85%;
    border-radius: 5rem;
    overflow: hidden;
  }
  svg {
    width: 20px;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.p`
  color: ${({ theme }) => theme.colors.spinner};
  display: inline-flex;
  .welcome_mention {
    color: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function HeaderProfile() {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const { profile, id, name } = useRecoilValue(userAtom);

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
      <ProfileName>
        {name}
        <p className="welcome_mention">님 환영합니다.</p>
      </ProfileName>
      <ProfileImageWrapper>
        <div className="img_horizon">
          <img src={profile} alt={id.toString()} />
        </div>
      </ProfileImageWrapper>
      {isHamburger && <HeaderProfileDropdown />}
    </Container>
  );
}
