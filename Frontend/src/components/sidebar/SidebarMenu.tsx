import { useState, useEffect, SetStateAction } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../../components/common/Icon';

type Route = {
  path: string;
  name: string;
  icon: JSX.Element;
};

interface IProps {
  route: { path: string; name: string; icon: JSX.Element; subRoutes: Route[] };
  showAnimation: Variants;
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

const Menu = styled.div``;

const MenuItem = styled.div``;

const MenuIcon = styled.div``;

const MenuText = styled(motion.div)``;

const MenuDownArrow = styled(motion.div)``;

const MenuContainer = styled(motion.div)``;

const menuAnimation: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
  show: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
    },
  },
};

const menuItemAnimation: Variants = {
  hidden: (i) => ({
    padding: 0,
    x: '-100%',
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

export default function SidebarMenu({
  isOpen,
  route,
  setIsOpen,
  showAnimation,
}: IProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <Menu onClick={menuHandler}>
        <MenuItem>
          <MenuIcon>{route.icon}</MenuIcon>
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
        </MenuItem>
        {isOpen && (
          <MenuDownArrow animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}>
            <Icon icon="DownArrow" size="md" />
          </MenuDownArrow>
        )}{' '}
        <AnimatePresence>
          {route.subRoutes.map((subRoute, i) => (
            <MenuContainer
              variants={menuAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              key={i}
            >
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <NavLink to={subRoute.path} className="link">
                  <MenuIcon>{subRoute.icon}</MenuIcon>
                  <MenuText>{subRoute.name}</MenuText>
                </NavLink>
              </motion.div>
            </MenuContainer>
          ))}{' '}
        </AnimatePresence>
      </Menu>
    </>
  );
}
