import useMyBookRatingHook from '@hooks/useMyBookRatingHook';
import Loader from 'components/common/Loader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

export default function Rating() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const { data, isLoading } = useMyBookRatingHook(parseInt(users_books_id));
  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        data?.result.map((value) => (
          <div key={value.created_at}>{value.created_at}</div>
        ))
      )}
    </Container>
  );
}
