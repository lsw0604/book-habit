import { axios } from './';
import Axios from 'axios';

/**
 * * 책 검색하는 API
 */
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

/**
 * * 책 등록하는 API
 */

// export const bookRegisterAPI = async (body: )

/**
 * * 읽은 책 등록하는 API
 */
export const readBookRegisterAPI = async (body: ReadBookRegisterType) => {
  const { data } = await axios.post(`/api/books/read`, body);
  return data;
};

/**
 * * 읽고 있는 책 등록하는 API
 */
export const readingBookRegisterAPI = async (body: ReadingBookRegisterType) => {
  const { data } = await axios.post(`/api/books/reading`, body);
  return data;
};

/**
 * * 읽고 싶은 책 등록하는 API
 */
export const readToBookRegisterAPI = async (body: ReadToBookRegisterType) => {
  const { data } = await axios.post(`/api/books/read_to`, body);
  return data;
};
