import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { userAtom } from 'recoil/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import HeaderAuth from './HeaderAuth';
import HeaderPalette from './HeaderPalette';
import { ColorType } from 'types/style';
import { Cookies } from 'react-cookie';
import { accessAPI } from 'lib/api/auth';

interface IProps {
  onToggle: () => void;
  isOn: boolean;
  selectedColor: ColorType;
  colorHandler: (color: ColorType) => void;
}

const Container = styled.nav`
  position: fixed;
  top: 0;
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.mode.main};
  padding: 0 2rem;
  z-index: 9999;
`;

const Logo = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function Index({
  onToggle,
  isOn,
  selectedColor,
  colorHandler,
}: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const paletteRef = useRef<HTMLDivElement>(null);

  const path = window.location.pathname.slice(1);
  const userState = useRecoilValue(userAtom);
  const userSetState = useSetRecoilState(userAtom) || {
    email: '',
    id: 0,
    name: '',
  };
  const cookies = new Cookies();

  const access = cookies.get('access');

  const fetchUser = async () => {
    const { email, name, id } = await accessAPI();
    if (id && email && name) {
      userSetState({ email, id, name });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      !!access &&
      userState.email === '' &&
      userState.id === 0 &&
      userState.name === ''
    ) {
      console.log('s');
      fetchUser();
    }
  }, []);

  return (
    <header>
      <Container ref={paletteRef}>
        <Logo onClick={() => navigate('/')}>Logo</Logo>
        <>{userState.email}</>
        {path === 'register' || path === 'login' ? null : (
          <div style={{ display: 'inline-flex', gap: '10px' }}>
            <HeaderPalette
              onToggle={onToggle}
              isOn={isOn}
              selectedColor={selectedColor}
              colorHandler={colorHandler}
            />
            <HeaderAuth />
          </div>
        )}
      </Container>
    </header>
  );
}
