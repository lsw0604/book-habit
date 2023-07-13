import styled from 'styled-components';

import { customize } from '@style/colors';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Container = styled.div`
  display: flex;
  max-width: 20rem;
  align-items: center;
  justify-content: center;
  border: 9999px;
  background-color: ${customize.gray['800']};
  font-size: 0.875rem;
  line-height: 1.25rem;
  &:focus {
    outline: none;
  }
`;

const Image = styled.image<ImageProps>`
  border: 9999px;
  height: 2rem;
  width: 2rem;
`;

const Span = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export default function Avatar() {
  return (
    <Container>
      <Span>Avatar</Span>
      <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
    </Container>
  );
}
