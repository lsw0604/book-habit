import axios from 'axios';

type Book = {
  title: string;
  author: string;
  company: string;
  published_date: string;
  image: string;
  rank: number;
};

export const list = async () => {
  const { data } = await axios.get<Book[]>(
    'http://localhost:8000/list/20230726',
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  return data;
};

export const bestsellerAPI = async (page: number, limit: number) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_SERVER
    }/api/books/list/20230726?page=${page}&limit=${limit}`
  );
  return data;
};
