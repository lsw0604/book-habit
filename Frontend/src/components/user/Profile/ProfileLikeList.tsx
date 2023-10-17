import useProfileLikeInfinityQuery from '@queries/profile/useProfileLikeInfinityQuery';
import styled from 'styled-components';
import ProfileLikeItem from './ProfileLikeItem';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid red;
`;
export default function ProfileLikeList() {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useProfileLikeInfinityQuery();
  return (
    <Container>
      {data?.pages.map((page) =>
        page.like_list.map((like) => (
          <ProfileLikeItem key={like.like_id} {...like} />
        ))
      )}
    </Container>
  );
}
