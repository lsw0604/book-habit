import { axios } from './';
import Axios from 'axios';

export const rankingAPI = async (page: number, limit: number) => {
  const { data } = await axios.get<ResponseBookType>(
    `/api/books/ranking?page=${page}&limit=${limit}`
  );
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