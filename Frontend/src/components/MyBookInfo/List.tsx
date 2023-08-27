import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import addHours from 'date-fns/addHours';
import dateParse from 'date-fns/parseISO';

import Item from 'components/MyBookInfo/Item';
import useMyBookInfoList from '@hooks/useMyBookInfoList';
import Loader from 'components/common/Loader';

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
`;

export default function List({ filter }: { filter: string[] }) {
  const { users_books_id, title } = useParams();
  let modifyData: MyBookInfoResponseType[] = [];

  if (users_books_id === undefined || title === undefined) {
    return <div>올바른 접근이 아닙니다.</div>;
  }

  const { data, isError, error, isFetching, isLoading, isSuccess } =
    useMyBookInfoList(parseInt(users_books_id), title, filter);

  if (isLoading) {
    return (
      <Container>
        <Loader size={2} />
      </Container>
    );
  }

  useEffect(() => {
    if (isSuccess && data) {
      modifyData = data.map((book) => {
        const {
          created_at,
          end_date,
          page,
          rating,
          start_date,
          updated_at,
          status,
        } = book;
        let modiStart;
        let modiEnd;
        let updatedTime;

        if (start_date) {
          modiStart = addHours(dateParse(start_date), 9)
            .toISOString()
            .split('T')[0];
        }
        if (end_date) {
          modiEnd = addHours(dateParse(end_date), 9)
            .toISOString()
            .split('T')[0];
        }
        if (updated_at) {
          updatedTime = addHours(dateParse(updated_at), 9)
            .toISOString()
            .split('T')[0];
        }

        const modiObj: MyBookInfoResponseType = {
          page,
          rating,
          status,
          created_at: addHours(dateParse(created_at), 9)
            .toISOString()
            .split('T')[0],
          updated_at: updatedTime ? updatedTime : updated_at,
          start_date: modiStart ? modiStart : start_date,
          end_date: modiEnd ? modiEnd : end_date,
        };
        return modiObj;
      });
    }
  }, [isSuccess, data]);

  return (
    <>
      <Container>
        {isSuccess &&
          modifyData &&
          modifyData.map((value, index) => <Item key={index} {...value} />)}
      </Container>
    </>
  );
}
