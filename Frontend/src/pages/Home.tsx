import { useQuery } from '@tanstack/react-query';
import Loader from 'components/common/Loader';
import { list } from 'lib/api/book';
import { useRecoilState } from 'recoil';
import { bookAtom } from 'recoil/book';

export default function Home() {
  const [bookState, setBookState] = useRecoilState(bookAtom);
  const { isLoading } = useQuery(['book_list'], list, {
    onSuccess: (data) => {
      setBookState([...data]);
    },
    staleTime: Infinity,
  });

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {bookState &&
            bookState.map((value) => (
              <div key={value.rank}>
                <div>{value.title}</div>
                <div>{value.author}</div>
              </div>
            ))}
        </>
      )}
    </>
  );
}
