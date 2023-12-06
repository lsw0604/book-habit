import HelmetProvider from 'components/common/HelmetProvider';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 1rem;
`;

const HELMET_PROVIDER_OPTIONS = {
  title: '사용방법',
  description: '사용방법을 보여주는 페이지입니다.',
};

export default function UserGuide() {
  return (
    <>
      <HelmetProvider {...HELMET_PROVIDER_OPTIONS} />
      <Container>UserGuide</Container>
    </>
  );
}
