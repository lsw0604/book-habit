import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Item from 'components/MyBookInfo/Item';
import useMyBookHistoryHook from '@hooks/useMyBookHistoryHook';
import Loader from 'components/common/Loader';

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  max-height: 300px;
  overflow: scroll;
`;

const EmptyTag = styled.div`
  width: 100%;
  height: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function List({ filter }: { filter: string[] }) {
  const { users_books_id } = useParams();

  if (users_books_id === undefined) {
    return <div>올바른 접근이 아닙니다.</div>;
  }

  const { data, isFetching, isLoading, isSuccess } = useMyBookHistoryHook(
    parseInt(users_books_id),
    filter
  );

  return (
    <>
      {(isLoading || isFetching) && (
        <EmptyTag>
          <Loader size={2} />
        </EmptyTag>
      )}
      <Container>
        {isSuccess && data && data.length !== 0 ? (
          data.map((value, index) => <Item key={index} {...value} />)
        ) : filter.length === 0 ? (
          <EmptyTag>태그를 선택해 주세요.</EmptyTag>
        ) : (
          <EmptyTag>검색 결과가 없습니다.</EmptyTag>
        )}
      </Container>
    </>
  );
}
