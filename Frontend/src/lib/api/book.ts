import { axios } from './';
import Axios from 'axios';

export const rankingAPI = async (page: number, limit: number) => {
  const { data } = await axios.get<ResponseBookType>(
    `/api/books/ranking?page=${page}&limit=${limit}`
  );
  return data;
};

export const myBooksAPI = async (page: number, status: SelectorBookType) => {
  const { data } = await axios.get<MyBookResponseType>(
    `/api/books/my_books?page=${page}&status=${status}`
  );
  return data;
};

export const myBooksInfoAPI = async (users_books_id: number, title: string) => {
  const { data } = await axios.get<{ books: MyBookInfoResponseType[] }>(
    `/api/books/my_books/${title}/${users_books_id}`
  );
  return data;
};

export const myBooksInfoAddReadAPI = async (body: MyBookInfoAddReadType) => {
  console.log(body);
  const { data } = await axios.post<BookRegisterResponseType>(
    `/api/books/read_add`,
    body
  );
  return data;
};

export const myBooksInfoAddReadingAPI = async (
  body: MyBookInfoAddReadingType
) => {
  const { data } = await axios.post(`/api/books/reading_add`, body);
  return data;
};

export const myBooksAlreadyAPI = async (isbn: string) => {
  const { data } = await axios.get(`/api/books/my_books_info/${isbn}`);
  return data;
};

export const booksSearchAPI = async (body: string, page: number) => {
  const { data } = await Axios.get(
    `https://dapi.kakao.com/v3/search/book?query=${encodeURI(
      body
    )}&sort=accuracy&page=${page}&size=10&target=title`,
    {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API}`,
      },
    }
  );
  return data;
};

export const readBookRegisterAPI = async (body: ReadBookRegisterType) => {
  const { data } = await axios.post(`/api/books/read`, body);
  return data;
};

export const readingBookRegisterAPI = async (body: ReadingBookRegisterType) => {
  const { data } = await axios.post(`/api/books/reading`, body);
  return data;
};

export const readToBookRegisterAPI = async (body: ReadToBookRegisterType) => {
  const { data } = await axios.post(`/api/books/read_to`, body);
  return data;
};
