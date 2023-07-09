import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div<{ on: boolean }>`
  height: 40px;
  width: 100px;
  background-image: ${({ on }) =>
    on
      ? `radial-gradient(circle farthest-corner at 10% 20%,rgba(253, 203, 50, 1) 0%,rgba(244, 56, 98, 1) 100.2%)`
      : `linear-gradient(109.8deg, rgba(62,5,116,1) -5.2%, rgba(41,14,151,1) -5.2%, rgba(216,68,148,1) 103.3%) `};
  border-radius: 25px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  padding: 0 5px;
  transition: all 0.3s;
  justify-content: ${({ on }) => (on ? 'flex-end' : 'flex-start')};
`;

const Handle = styled(motion.div)<{ on: boolean }>`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: #fff;
  overflow: hidden;
`;

const Icon = styled(motion.i)<{ on: boolean }>`
  color: ${({ on }) => (on ? '#f88748' : '#501a96')};
`;

interface IProps {}

const Switch: React.FC<IProps> = () => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const onClick = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <Container on={isOn} onClick={onClick}>
      <Handle layout on={isOn}>
        <AnimatePresence initial={false}>
          <Icon
            on={isOn}
            className={`icon far fa-${isOn ? 'moon' : 'sun'}`}
            key={isOn ? 'moon' : 'sun'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </Handle>
    </Container>
  );
};

export default Switch;
