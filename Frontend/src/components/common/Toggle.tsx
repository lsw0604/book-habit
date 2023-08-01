import { customize } from '@style/colors';
import { SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

interface IProps {
  icons?: JSX.Element[];
  isOn: boolean;
  toggleHandler: (value: SetStateAction<boolean>) => void;
}

const Container = styled.div<{ isOn: boolean }>`
  padding: 0;
  margin: 0;
  height: 1.5rem;
  width: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 1.5rem;
  border: none;
  background-color: ${(props) =>
    props.isOn ? customize.lime['500'] : customize.gray['500']};
  justify-content: ${(props) => (props.isOn ? 'flex-end' : 'flex-start')};
  transition: all 0.3s;
`;

const Handle = styled(motion.div)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: ${customize.slate['300']};
  overflow: hidden;
`;

const Icon = styled(motion.i)`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function Toggle({
  toggleHandler,
  isOn,
  icons,
  ...props
}: IProps) {
  return (
    <Container
      {...props}
      isOn={isOn}
      onClick={() => toggleHandler((prev) => !prev)}
    >
      <Handle layout>
        <AnimatePresence initial={isOn} mode={'wait'}>
          {icons !== undefined ? (
            isOn ? (
              <Icon
                key={0}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {icons[0]}
              </Icon>
            ) : (
              <Icon
                key={1}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {icons[1]}
              </Icon>
            )
          ) : null}
        </AnimatePresence>
      </Handle>
    </Container>
  );
}
