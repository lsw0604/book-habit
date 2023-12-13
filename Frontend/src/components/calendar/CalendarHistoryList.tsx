import styled from 'styled-components';
import { v4 } from 'uuid';

import CalendarHistoryItem from 'components/calendar/CalendarHistoryItem';
import Loader from 'components/common/Loader';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import { IconPlus } from '@style/icons';
import Icon from 'components/common/Button/Icon';

interface IProps {
  filter: string[];
  users_books_id: number;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 104px;
  overflow: scroll;
  position: relative;
  display: flex;
  padding: 1rem 0;
  flex-direction: column;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
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

export default function CalendarHistoryList({
  filter,
  users_books_id,
}: IProps) {
  const { myBookHistoryData, myBookHistoryIsLoading, myBookHistoryIsFetching } =
    useMyBookPageQueries(users_books_id, filter);

  if (!myBookHistoryData) return null;

  if (myBookHistoryIsLoading || myBookHistoryIsFetching) {
    return (
      <Container>
        <LoadingContainer>
          <Loader size={2} />
        </LoadingContainer>
      </Container>
    );
  }

  if (filter.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          <EmptyTag>찾고자하는 상태를 선택해주세요.</EmptyTag>
        </LoadingContainer>
      </Container>
    );
  }

  if (myBookHistoryData.length === 0) {
    return (
      <Container>
        <EmptyTag>
          아직 등록된 독서기록이 없습니다.
          <Icon icon={<IconPlus />}>AddHistory</Icon>
        </EmptyTag>
      </Container>
    );
  }

  return (
    <Container>
      <ListContainer>
        {myBookHistoryData.map((value) => (
          <CalendarHistoryItem
            key={v4()}
            users_books_id={users_books_id}
            {...value}
          />
        ))}
      </ListContainer>
    </Container>
  );
}
