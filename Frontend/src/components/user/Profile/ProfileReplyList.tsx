import { useState } from 'react';

import Loader from 'components/common/Loader';
import styled from 'styled-components';
import ProfileReplyItem from './ProfileReplyItem';
import useProfileReplyQuery from '@queries/profile/useProfileReplyQuery';
import Pagination from 'components/common/Pagination';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
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
  const { data, isLoading, isFetching } = useProfileReplyQuery(page);
  if (data === undefined)
    return (
      <LoadingWrapper>
        <Loader size={2} />
      </LoadingWrapper>
    );

  if (data?.items.length === 0)
    return (
      <Container>
        <EmptyContainer>내가 등록한 댓글이 없습니다.</EmptyContainer>
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
