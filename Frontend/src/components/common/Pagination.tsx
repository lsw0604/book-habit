import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import Icon from './Button/Icon';
import { IconLeftArrow, IconRightArrow } from '@style/icons';

interface IProps {
  totalPage: number;
  page: number;
  nextPage?: number;
  prevPage?: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PaginationNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PaginationNumber = styled.p<{ isFocus: boolean }>`
  line-height: 40px;
  font-size: 20x;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isFocus }) =>
    isFocus
      ? ({ theme }) => theme.colors.spinner
      : ({ theme }) => theme.mode.typo_sub};
`;

export default function Pagination({
  totalPage,
  page,
  setPage,
  nextPage,
  prevPage,
}: IProps) {
  const nextPageHandler = () => {
    if (nextPage && page < nextPage) {
      setPage(nextPage);
    }
  };

  const prevPageHandler = () => {
    if (prevPage && page > prevPage) {
      setPage(prevPage);
    }
  };

  const pageHandler = (toPage: number) => {
    if (page !== toPage) {
      setPage(toPage);
    }
  };

  return (
    <Container>
      <Icon icon={<IconLeftArrow />} onClick={prevPageHandler}>
        prev
      </Icon>
      <PaginationNumberContainer>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((a) => (
          <PaginationNumber
            onClick={() => pageHandler(a)}
            isFocus={a === page}
            key={a}
          >
            {a}
          </PaginationNumber>
        ))}
      </PaginationNumberContainer>
      <Icon icon={<IconRightArrow />} onClick={nextPageHandler}>
        next
      </Icon>
    </Container>
  );
}
