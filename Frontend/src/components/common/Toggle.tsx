import { customize } from '@style/colors';
import { ButtonHTMLAttributes, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icons?: JSX.Element[];
  isOn: boolean;
  setIsOn: (value: SetStateAction<boolean>) => void;
}

const Container = styled.button<{ isOn: boolean }>`
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

const Wrapper = styled(motion.div)<{ isOn: boolean }>`
  display: flex;
  padding: 10px;
  /* position: relative; */
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 90%;
  border-radius: 50%;
  background-color: white;
`;

const Label = styled.label``;

export default function Toggle({ setIsOn, isOn, icons, ...props }: IProps) {
  return (
    <Container {...props} isOn={isOn} onClick={() => setIsOn((prev) => !prev)}>
      <Handle layout>
        <AnimatePresence initial={isOn}></AnimatePresence>
      </Handle>
    </Container>
  );
}
