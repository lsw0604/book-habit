import styled from 'styled-components';
import { useEffect } from 'react';
import { myBooksInfoAPI } from 'lib/api/book';
import { useParams } from 'react-router-dom';
import addHours from 'date-fns/addHours';
import dateParse from 'date-fns/parseISO';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
`;

export default function MyBooksInfoPage() {
  const { isbn } = useParams();
  const fetch = async () => {
    const { books } = await myBooksInfoAPI(isbn as string);
    const modify = books.map((book) => {
      const {
        created_at,
        end_date,
        isbn,
        page,
        rating,
        start_date,
        status,
        title,
      } = book;
      let modiStart;
      let modiEnd;

      if (book.start_date) {
        modiStart = addHours(dateParse(book.start_date), 9)
          .toISOString()
          .split('T')[0];
      }
      if (book.end_date) {
        modiEnd = addHours(dateParse(book.end_date), 9)
          .toISOString()
          .split('T')[0];
      }

      const modiObj: MyBookInfoResponseType = {
        isbn,
        page,
        rating,
        status,
        title,
        created_at: addHours(dateParse(created_at), 9)
          .toISOString()
          .split('T')[0],
        start_date: modiStart ? modiStart : start_date,
        end_date: modiEnd ? modiEnd : end_date,
      };

      return modiObj;
    });
    console.log(modify);
    return modify;
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container>
      <span>내 책정보</span>
    </Container>
  );
}
