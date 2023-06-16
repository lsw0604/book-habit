import { memo, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { size } from './size';
import { IconType, SizeType, ToggleIconTupleType } from 'types/style';
import Icon from '../Icon';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ToggleIconTupleType<IconType, 2>;
  size: SizeType;
}

interface ContainerProps {
  size: SizeType;
}

interface CircleProps {
  checked?: boolean;
}

const getToggleButtonSize = (ctx: SizeType) => css`
  height: ${size[ctx].height}px;
  width: ${size[ctx].width}px;
  border-radius: ${size[ctx]['border-radius']}px;
`;

const Container = styled.label<ContainerProps>`
  margin: 0;
  padding: 0;
  cursor: pointer;
  align-items: center;
  z-index: 999;
  display: flex;
  ${(props) => getToggleButtonSize(props.size)};
  box-shadow: ${({ theme }) => theme.shadow.xl};
  border: none;
  background-color: ${({ theme }) => theme.mode.bg_toggle};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const CircleButton = styled(motion.div)<CircleProps>`
  padding: 2px;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 45%;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.mode.bg_main};
`;

const Toggle: React.FC<IProps> = ({ icon, size, ...props }) => {
  const { checked } = props;
  const x = useMotionValue(checked ? 1 : 0);
  const scale = useTransform(x, [0, 1], [0, 1]);

  const handleCheckboxChange = () => {
    x.set(checked ? 0 : 1);
  };

  return (
    <Container size={size}>
      <HiddenCheckbox {...props} onChange={handleCheckboxChange} />
      <CircleButton
        style={{ scale }}
        initial={false}
        animate={{ scale }}
        transition={{ duration: 0.3, ease: 'linear' }}
        checked={checked}
      >
        {checked ? (
          <Icon icon={icon[0]} size={size} color="yellow" colorNum="400" />
        ) : (
          <Icon icon={icon[1]} size={size} color="yellow" colorNum="400" />
        )}
      </CircleButton>
    </Container>
  );
};

const Index = memo(Toggle);

export default Index;
