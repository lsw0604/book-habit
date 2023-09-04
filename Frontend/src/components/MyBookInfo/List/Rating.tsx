import useMyBookRatingHook from '@hooks/useMyBookRatingHook';
import Loader from 'components/common/Loader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Item from 'components/MyBookInfo/Item/Rating';

const Container = styled.div`
  width: 100%;
  max-height: 14rem;
  overflow: scroll;
  scroll-behavior: row;
`;

const EmptyTag = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Rating() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const { data, isLoading, isFetching } = useMyBookRatingHook(
    parseInt(users_books_id)
  );
  return (
    <Container>
      {isLoading || isFetching ? (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      ) : data?.result.length !== 0 ? (
        data?.result.map((value, index) => <Item key={index} {...value} />)
      ) : (
        <EmptyTag>아직 등록된 평가가 없습니다.</EmptyTag>
      )}
    </Container>
  );
}
