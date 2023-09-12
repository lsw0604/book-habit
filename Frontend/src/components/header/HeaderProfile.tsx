import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import HeaderProfileDropdown from './HeaderProfileDropdown';
import { userAtom } from 'recoil/user';

const Container = styled.div<{ isHamburger: boolean }>`
  display: flex;
  cursor: pointer;
  &:focus {
    background-color: ${({ theme }) => theme.mode.sub};
  }
`;

const Span = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.main};
`;

const Name = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function HeaderProfile() {
  const { name } = useRecoilValue(userAtom);
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
      {name !== null ? (
        <Span>
          {name}
          <Name>님 환영합니다.</Name>
        </Span>
      ) : (
        <Name>개인정보를 등록해주세요.</Name>
      )}
      {isHamburger && <HeaderProfileDropdown />}
    </Container>
  );
}
