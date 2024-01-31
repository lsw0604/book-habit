import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Loader from 'components/common/loader';
import ProfileReplyItem from './ProfileReplyItem';
import Pagination from 'components/common/Pagination';
import useProfileReplyQuery from '@queries/profile/useProfileReplyQuery';

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

const ReplyContainer = styled.div`
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

export default function ProfileReplyList() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching, refetch } = useProfileReplyQuery(page);

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
        <EmptyContainer>등록된 댓글이 없습니다.</EmptyContainer>
      </Container>
    );

  return (
    <Container>
      {!isLoading || !isFetching ? (
        <ReplyContainer>
          {data?.items.map((item) => (
            <ProfileReplyItem key={item.reply_id} {...item} />
          ))}
        </ReplyContainer>
      ) : (
        <LoadingWrapper>
          <Loader size={2} />
        </LoadingWrapper>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        nextPage={data.nextPage}
        prevPage={data.prevPage}
        totalPage={data.totalPage}
      />
    </Container>
  );
}
