import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Loader from 'components/common/Loader';
import ProfileLikeItem from 'components/Profile/ProfileLikeItem';
import Pagination from 'components/common/Pagination';
import useProfileLikeQuery from '@queries/profile/useProfileLikeQuery';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  position: relative;
`;

const LikeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: scroll;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`;

export default function ProfileLikeList() {
  const [page, setPage] = useState<number>(1);
  const { data, isFetching, isLoading, refetch } = useProfileLikeQuery(page);

  useEffect(() => {
    refetch();
  }, [page]);

  if (data === undefined)
    return (
      <LoadingWrapper>
        <Loader size={2} />
      </LoadingWrapper>
    );

  if (data?.items.length === 0)
    return (
      <Container>
        <EmptyContainer>등록된 좋아요가 없습니다.</EmptyContainer>
      </Container>
    );

  return (
    <Container>
      {!isLoading || !isFetching ? (
        <LikeContainer>
          {data?.items.map((item) => (
            <ProfileLikeItem key={item.like_id} {...item} />
          ))}
        </LikeContainer>
      ) : (
        <LoadingWrapper>
          <Loader size={2} />
        </LoadingWrapper>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={data.totalPage}
        nextPage={data.nextPage}
        prevPage={data.prevPage}
      />
    </Container>
  );
}
