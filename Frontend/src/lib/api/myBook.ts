import { axios } from './';

/**
 * * 내 서재 리스트 불러오는 API
 */
export const myBookListAPI = async (page: number, status: SelectorBookType) => {
  const { data } = await axios.get(
    `/api/my_book/list?page=${page}&status=${status}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책 정보를 보는 API
 */
export const myBookInfoAPI = async (users_books_id: number) => {
  const { data } = await axios.get<MyBookInfoResponseType>(
    `/api/my_book/info/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책 기록 보는 API
 */
export const myBookHistoryAPI = async (users_books_id: number) => {
  const { data } = await axios.get<{ books: MyBookHistoryResponseType[] }>(
    `/api/my_book/history/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책 평점들을 보는 API
 */

export const myBookRatingAPI = async (users_books_id: number) => {
  const { data } = await axios.get(`/api/my_book/rating/${users_books_id}`);
  return data;
};

/**
 * * 내 서재에 등록된 책인지 확인하는 API
 */
export const myBookExistAPI = async (isbn: string) => {
  const { data } = await axios.get<MyBookExistResponseType>(
    `/api/my_book/exist/${isbn}`
  );
  return data;
};

/**
 * * 내 서재에 기록을 등록하는 API
 */
export const myBookHistoryRegisterAPI = async (
  body: MyBookHistoryRegisterType
) => {
  const { data } = await axios.post(`/api/my_book/register`, body);
  return data;
};

/**
 * * 내 서재에 등록된 책에 평점을 등록하는 API
 */
export const myBookRatingRegisterAPI = async (
  body: MyBookRatingRegisterType
) => {
  const { data } = await axios.post(`/api/my_book/rating`, body);
  return data;
};

/**
 * * 내 서재에 등록된 평점을 삭제하는 API
 */
export const myBookRatingDeleteAPI = async (users_books_info_id: number) => {
  const { data } = await axios.delete(
    `/api/my_book/delete/rating/${users_books_info_id}`
  );
  return data;
};
