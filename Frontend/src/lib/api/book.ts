import { axios } from './';
import Axios from 'axios';

// READ

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
 * * 책 정보 조회하는 API
 */
export const bookInfoAPI = async (title: string) => {
  const { data } = await axios.get(`/api/books/info?title=${title}`);
  return data;
};

// CREATE

/**
 * * 책 등록하는 API
 */
export const bookRegisterAPI = async (body: BookRegisterType) => {
  const { data } = await axios.post<MutationResponse>(
    `/api/books/register`,
    JSON.stringify(body),
    {
      method: 'POST',
    }
  );
  return data;
};
