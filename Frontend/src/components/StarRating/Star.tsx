import { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import styled from 'styled-components';
import Icon from '../common/Icon/index';

interface IProps {
  i: number;
  isHoveringWrapper: boolean;
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

const Background = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 50%;
  background: #aaa;
  cursor: pointer;
`;

const IconStar = styled(motion.i)`
  position: relative;
  z-index: 10;
  cursor: pointer;
`;

export default function Star({ i, isHoveringWrapper, isClicked }: IProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const starControls = useAnimation();
  const backgroundControls = useAnimation();

  useEffect(() => {
    if (isClicked && isHovering) {
      starControls.start('hovered');
    } else if (isClicked) {
      starControls.start('animate');
    } else {
      starControls.start('exit');
    }
  }, [isClicked, isHovering]);

  useEffect(() => {
    backgroundControls.start({
      background: isHoveringWrapper ? '#ffd700' : '#aaa',
    });
  }, [isHoveringWrapper]);

  return (
    <>
      <Background animate={backgroundControls} />
      {i !== 0 && (
        <IconStar
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          variants={starVariants}
          initial="initial"
          animate={starControls}
          custom={i}
        >
          <Icon icon="Star" size="xl" />
        </IconStar>
      )}
    </>
  );
}
