import { axios } from './';

// READ

/**
 * * 내 서재 리스트 불러오는 API
 */
export const myBookListAPI = async (page: number, status: SelectorBookType) => {
  const { data } = await axios.get<MyBookListResponseType>(
    `/api/my_book/list?page=${page}&status=${status}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책 정보를 보는 API
 */
export const myBookInfoAPI = async (users_books_id: MyBookInfoRequestType) => {
  const { data } = await axios.get<MyBookInfoResponseType>(
    `/api/my_book/info/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책 기록 보는 API
 */
export const myBookHistoryAPI = async (
  users_books_id: MyBookHistoryListRequestType
) => {
  const { data } = await axios.get<MyBookHistoryListResponseType>(
    `/api/my_book/history/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책 평점들을 보는 API
 */

export const myBookRatingAPI = async (
  users_books_id: MyBookRatingRequestType
) => {
  const { data } = await axios.get<MyBookRatingResponseType>(
    `/api/my_book/rating/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책인지 확인하는 API
 */
export const myBookExistAPI = async (isbn: MyBookExistRequestType) => {
  const { data } = await axios.get<MyBookExistResponseType>(
    `/api/my_book/exist/${isbn}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책의 시간 범위 확인하는 API
 */
export const myBookTimeRangeAPI = async (
  users_books_id: MyBookTimeRangeRequestType
) => {
  const { data } = await axios.get<MyBookTimeRangeResponseType>(
    `/api/my_book/time_range/${users_books_id}`
  );
  return data;
};

// CREATE

/**
 * * 내 서재에 기록을 등록하는 API
 */
export const myBookHistoryRegisterAPI = async (
  body: MyBookAddFormHistoryRegisterRequestType
) => {
  const { data } = await axios.post<MyBookAddFormHistoryRegisterResponseType>(
    `/api/my_book/register`,
    body
  );
  return data;
};

/**
 * * 내 서재에 등록된 책에 평점을 등록하는 API
 */
export const myBookRatingRegisterAPI = async (
  body: MyBookAddFormRatingRegisterRequestType
) => {
  const { data } = await axios.post<MyBookAddFormRatingRegisterResponseType>(
    `/api/my_book/rating`,
    body
  );
  return data;
};

// DELETE

/**
 * * 내 서재에 등록된 평점을 삭제하는 API
 */
export const myBookRatingDeleteAPI = async (
  users_books_info_id: MyBookRatingDeleteRequestType
) => {
  const { data } = await axios.delete<MyBookRatingDeleteResponseType>(
    `/api/my_book/delete/rating/${users_books_info_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책을 삭제하는 API
 */
export const myBookListDeleteAPI = async (
  users_books_id: MyBookListDeleteRequestType
) => {
  const { data } = await axios.delete<MyBookListDeleteResponseType>(
    `/api/my_book/list/delete/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 기록을 삭제하는 API
 */
export const myBookHistoryDeleteAPI = async (users_books_status_id: number) => {
  const { data } = await axios.delete(
    `/api/my_book/delete/history/${users_books_status_id}`
  );
  return data;
};
