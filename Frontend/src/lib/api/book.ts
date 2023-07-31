import { axios } from './';
import Axios from 'axios';

export const rankingAPI = async (page: number, limit: number) => {
  const { data } = await axios.get<ResponseBookType>(
    `/api/books/ranking?page=${page}&limit=${limit}`
  );
  return data;
};

interface IBookSearchResponse {
  lastBuildDate: Date;
  total: number;
  start: number;
  display: number;
  items: {
    title: string;
    link: string;
    image: string;
    author: string;
    isbn: string;
    description?: string;
  }[];
}

const kakaoAxios = Axios.create({
  baseURL: 'https://dapi.kakao.com/v3/search/',
  headers: {
    Authorization: `Kakao ${import.meta.env.VITE_KAKAO_REST_API}`,
  },
  withCredentials: true,
});

export const booksSearchAPI = async (body: string) => {
  await kakaoAxios.get(
    `/book?query=${encodeURI(body)}&sort=accuracy&page=1&size=20`
  );
};
