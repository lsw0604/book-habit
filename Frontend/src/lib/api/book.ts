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
  const { data } = await axios.get<Book[]>('http://localhost:8000/list', {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return data;
};
