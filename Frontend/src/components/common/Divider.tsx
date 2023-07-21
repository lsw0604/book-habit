import { customize } from '@style/colors';
import styled from 'styled-components';

interface IProps {
  divider: number;
}

const Container = styled.hr<{ divider: number }>`
  width: 100%;
  margin-top: ${({ divider }) => `${divider}px`};
  margin-bottom: ${({ divider }) => `${divider}px`};
  border-color: ${customize.gray['300']};
`;

export default function Divider({ divider }: IProps) {
  return <Container divider={divider} />;
}
