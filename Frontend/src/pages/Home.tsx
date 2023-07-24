import { useQuery } from '@tanstack/react-query';
import { list } from 'lib/api/book';
import { useRecoilState } from 'recoil';
import { bookAtom } from 'recoil/book';

export default function Home() {
  const [bookState, setBookState] = useRecoilState(bookAtom);
  const { isLoading } = useQuery(['book_list'], list, {
    onSuccess: (data) => {
      setBookState([...data]);
    },
    staleTime: 1000,
  });

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {bookState &&
            bookState.map((value) => <div key={value.rank}>{value.title}</div>)}
        </>
      )}
    </>
  );
}
