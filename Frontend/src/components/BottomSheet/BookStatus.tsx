import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import useMyBookExist from '@hooks/useMyBookExistHook';
import { bottomSheetAtom } from 'recoil/bottomSheet';

const Container = styled.div`
  border: 2px solid red;
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

  return (
    <Container>
      <div>BookStatus</div>
      {isbn}
    </Container>
  );
}
