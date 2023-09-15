import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import useMyBookExistQuery from '@queries/myBook/useMyBookExistQuery';
import { searchBookAtom } from 'recoil/searchBook';
import Loader from 'components/common/Loader';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
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
  const { isbn } = useRecoilValue(searchBookAtom);
  const { isLoading, data, isFetching } = useMyBookExistQuery(isbn);

  const filteringData = (status?: '등록' | '미등록') => {
    if (status === '등록') return '서재에 등록된 책입니다.';
    if (status === '미등록') return '아직 서재에 등록되지 않은 책입니다.';
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
