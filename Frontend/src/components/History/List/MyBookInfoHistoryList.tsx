import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import MyBookInfoHistoryItem from 'components/History/Item/MyBookInfoHistoryItem';
import Loader from 'components/common/Loader';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import { IconPlus } from '@style/icons';
import Icon from 'components/common/Button/Icon';

interface IProps {
  filter: string[];
}

const Container = styled.div`
  width: 100%;
  height: 6rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.md};
  background-color: ${({ theme }) => theme.mode.sub};
`;

const ItemListContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  scroll-snap-type: y mandatory;
`;

const EmptyTag = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_main};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HistoryList({ filter }: IProps) {
  const { users_books_id } = useParams();

  if (users_books_id === undefined) {
    return <div>올바른 접근이 아닙니다.</div>;
  }

  const {
    myBookHistoryData,
    myBookHistoryIsLoading,
    myBookHistoryIsFetching,
    myBookHistoryIsSuccess,
  } = useMyBookPageQueries(parseInt(users_books_id), filter);

  return (
    <Container>
      {myBookHistoryIsLoading || myBookHistoryIsFetching ? (
        <LoadingContainer>
          <Loader size={2} />
        </LoadingContainer>
      ) : myBookHistoryIsSuccess &&
        myBookHistoryData &&
        myBookHistoryData.length !== 0 ? (
        <ItemListContainer>
          {myBookHistoryData.map((value) => (
            <MyBookInfoHistoryItem key={value.id} {...value} />
          ))}
        </ItemListContainer>
      ) : (
        <EmptyTag>
          아직 등록된 독서기록이 없습니다.
          <Icon icon={<IconPlus />}>AddHistory</Icon>
        </EmptyTag>
      )}
    </Container>
  );
}
