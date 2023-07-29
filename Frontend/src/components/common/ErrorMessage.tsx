import styled from 'styled-components';
import { customize } from '@style/colors';

interface IProps {
  message: string;
}

const Container = styled.p`
  margin-top: 8px;
  font-weight: 700;
  font-size: 14px;
  color: ${customize.red['300']};
  margin-left: 10px;
`;

export default function ErrorMessage({ message }: IProps) {
  return <Container>{message}</Container>;
}
