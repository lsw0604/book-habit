import styled from 'styled-components';

import SearchBox from 'components/Search/SearchBox';
import ModalPortal from 'components/common/ModalPortal';
import BottomSheet from 'components/BottomSheet';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const Heading = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
`;

const HomePage = () => {
  return (
    <Container>
      <Heading>베스트 셀러 100</Heading>
      <Content>
        <SearchBox />
      </Content>
      <ModalPortal>
        <BottomSheet />
      </ModalPortal>
    </Container>
  );
};

export default HomePage;
