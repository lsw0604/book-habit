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

export const readBookRegisterAPI = async (body: ReadBookRegisterType) => {
  console.log('readBookRegisterAPI', body);
  const { data } = await axios.post(`/api/books/read`, body);
  return data;
};

export const readingBookRegisterAPI = async (body: ReadingBookRegisterType) => {
  console.log('readingBookRegisterAPI', body);
};

export const readToBookRegisterAPI = async (body: ReadToBookRegisterType) => {
  console.log('readToBookRegisterAPI', body);
};
