import { memo } from 'react';
import styled from 'styled-components';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element[];
}

const Container = styled.button``;

const Index: React.FC<IProps> = ({ icon, ...props }) => {
  return <div>Index</div>;
};

const Toggle = memo(Index);

export default Toggle;
