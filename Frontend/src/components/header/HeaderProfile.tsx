import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import HeaderProfileDropdown from './HeaderProfileDropdown';

interface IProps {
  name: string | null;
}

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

const P = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function HeaderProfile({ name }: IProps) {
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
      <Span>
        {name}
        <P>님 환영합니다.</P>
      </Span>
      {isHamburger && <HeaderProfileDropdown />}
    </Container>
  );
}
