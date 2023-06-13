import styled from 'styled-components';
import { memo } from 'react';

const Container = styled.button``;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Index: React.FC<IProps> = () => {
  return <div>buttons</div>;
};

const Button = memo(Index);

export default Button;
