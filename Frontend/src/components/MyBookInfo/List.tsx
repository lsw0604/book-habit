import { useEffect, useState } from 'react';
import addHours from 'date-fns/addHours';
import dateParse from 'date-fns/parseISO';
import { myBooksInfoAPI } from 'lib/api/book';
import { useParams } from 'react-router-dom';
import Item from 'components/MyBookInfo/Item';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
`;

export default function List() {
  const { users_books_id, title } = useParams();

  if (users_books_id === undefined || title === undefined) {
    return <div>올바른 접근이 아닙니다.</div>;
  }

  const [data, setData] = useState<MyBookInfoResponseType[]>([]);

  const fetch = async () => {
    const { books } = await myBooksInfoAPI(parseInt(users_books_id), title);
    const modify = books.map((book) => {
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
        modiEnd = addHours(dateParse(end_date), 9).toISOString().split('T')[0];
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
    setData(modify);
    return modify;
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <h1>{title}의 독서기록</h1>
      <Container>
        {data.map((value, index) => (
          <Item key={index} {...value} />
        ))}
      </Container>
    </>
  );
}
