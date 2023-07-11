import styled from 'styled-components';
import DesktopLayout from './layout/DesktopLayout';

export default function Welcome() {
  return (
    <DesktopLayout>
      <Wrapper></Wrapper>
    </DesktopLayout>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
