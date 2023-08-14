import { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import styled from 'styled-components';
import { IconStar } from '@style/icons';

interface IProps {
  i: number;
  isClicked: boolean;
}

const starVariants: Variants = {
  initial: {
    scale: 0,
  },
  animate: (i: number) => ({
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      type: 'spring',
      stiffness: 175,
    },
  }),
  exit: (i: number) => ({
    scale: 0,
    transition: {
      duration: 0.25,
      delay: 0.2 - i * 0.04,
    },
  }),
  hovered: {
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const IconStarWrapper = styled(motion.i)`
  position: relative;
  z-index: 10;
  cursor: pointer;
  width: auto;
  svg {
    height: 2rem;
    width: 2rem;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background: #aaa;
  cursor: pointer;
`;

export default function Star({ i, isClicked }: IProps) {
  const starControls = useAnimation();

  useEffect(() => {
    if (isClicked) {
      starControls.start('animate');
    } else {
      starControls.start('exit');
    }
  }, [isClicked]);

  return (
    <>
      <Background />
      {i !== 0 && (
        <IconStarWrapper
          variants={starVariants}
          initial="initial"
          animate={starControls}
          custom={i}
        >
          <IconStar />
        </IconStarWrapper>
      )}
    </>
  );
}
