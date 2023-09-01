import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import useMyBookExist from '@hooks/useMyBookExistHook';
import { bottomSheetAtom } from 'recoil/bottomSheet';
import Loader from 'components/common/Loader';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubHeading = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BookStatus() {
  const { isbn } = useRecoilValue(bottomSheetAtom);
  const { isLoading, data, isFetching } = useMyBookExist(isbn);

  const filteringData = (
    status?: '다읽음' | '읽는중' | '읽고싶음' | '미등록'
  ) => {
    switch (status) {
      case '다읽음':
        return '이 책은 다 읽은 책으로 서재에 등록된 책입니다.';
      case '읽고싶음':
        return '이 책은 읽고 싶은 책으로 서재에 등록된 책입니다.';
      case '읽는중':
        return '이 책은 읽는 중인 책으로 서재에 등록된 책입니다.';
      case '미등록':
        return '이 책은 서재에 등록되지 않은 책입니다.';
      default:
        return null;
    }
  };

  return (
    <Container>
      {isLoading || isFetching ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <SubHeading>{filteringData(data?.status)}</SubHeading>
      )}
    </Container>
  );
}
