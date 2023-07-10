import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styled from 'styled-components';

import Icon from '../../components/common/Icon';
import SidebarMenu from './SidebarMenu';

interface IProps {
  children: JSX.Element;
}

const MainContainer = styled.div`
  display: flex;
`;

const SubContainer = styled(motion.div)`
  background: rgb(0, 7, 61);
  color: white;
  height: 100vh;
  overflow-y: auto;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;

const Logo = styled(motion.h1)`
  font-size: 18px;
  line-height: 0;
`;

const Bars = styled.div`
  width: 30px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  height: 30px;
  padding: 10px;
`;

const Input = styled(motion.input)`
  border: none;
  margin-left: 10px;
  border-radius: 5px;
  background: rgb(238, 238, 238);
  color: white;
`;

const MenuText = styled(motion.div)`
  display: flex;
  color: white;
  gap: 10px;
  padding: 5px 10px;
  border-right: 4px solid transparent;
  transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  &:hover {
    border-right: 4px solid white;
    background: rgb(45, 51, 89);
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }
`;

const Routes = styled.section`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const routes = [
  {
    path: '/',
    name: 'Home',
    icon: <Icon icon="Home" size="md" />,
  },
  {
    path: '/users',
    name: 'Users',
    icon: <Icon icon="Male" size="md" />,
  },
  {
    path: '/mail',
    name: 'Mail',
    icon: <Icon icon="Mail" size="md" />,
    subRoutes: [
      {
        path: '/mail/write',
        name: 'Write',
        icon: <Icon icon="Pencil" size="md" />,
      },
      {
        path: '/mail/trash',
        name: 'Trash',
        icon: <Icon icon="TrashCan" size="md" />,
      },
    ],
  },
];

const inputAnimation: Variants = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: '140px',
    padding: '5ppx 15px',
    transition: {
      duration: 0.2,
    },
  },
};

const showAnimation: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.5,
    },
  },
};

export default function Sidebar({ children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <MainContainer>
        <SubContainer
          animate={{
            width: isOpen ? '200px' : '45px',
            transition: {
              duration: 0.5,
              type: 'spring',
              damping: 10,
            },
          }}
        >
          <TopSection>
            <AnimatePresence>
              {isOpen && (
                <Logo
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  hello
                </Logo>
              )}
            </AnimatePresence>
            <Bars onClick={openHandler}>
              <Icon icon="Hamburger" size="md" />
            </Bars>
          </TopSection>
          <Search>
            <div className="search_icon">
              <Icon icon="Search" size="md" />
            </div>
            <AnimatePresence>
              {isOpen && (
                <Input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </Search>
          <Routes>
            {routes.map((route, i) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={i}
                    isOpen={isOpen}
                    route={route}
                    showAnimation={showAnimation}
                    setIsOpen={setIsOpen}
                  />
                );
              }
              return (
                <NavLink
                  key={i}
                  to={route.path}
                  className={(isOpen) => (isOpen ? 'link' : 'active')}
                >
                  <Logo>{route.icon}</Logo>
                  <AnimatePresence>
                    {isOpen && (
                      <MenuText
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                      >
                        {route.name}
                      </MenuText>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </Routes>
        </SubContainer>
        <main>{children}</main>
      </MainContainer>
    </div>
  );
}
