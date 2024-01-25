import { customize } from '@style/colors';
import styled from 'styled-components';

interface IProps {
  divider: number;
}

const Container = styled.div<{ divider: number }>`
  width: 100%;
  height: 3px;
  margin-top: ${({ divider }) => `${divider}px`};
  margin-bottom: ${({ divider }) => `${divider}px`};
  background-color: ${customize.gray['300']};
`;

export default function Divider({ divider }: IProps) {
  return <Container divider={divider} />;
}
