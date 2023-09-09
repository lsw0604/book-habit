import { axios } from './';

// READ

/**
 * * 내 서재에 등록된 책 목록을 불러오는 API
 */
export const myBookListAPI = async (page: number, status: SelectorBookType) => {
  const { data } = await axios.get<MyBookListInfinityQueryResponseType>(
    `/api/my_book/list?page=${page}&status=${status}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책의 독서기록을 불러오는 API
 */
export const myBookHistoryAPI = async (
  users_books_id: MyBookPageQueriesHistoryListRequestType
) => {
  const { data } = await axios.get<MyBookPageQueriesHistoryListResponseType>(
    `/api/my_book/history/list/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책의 평점을 불러오는 API
 */

export const myBookRatingAPI = async (
  users_books_id: MyBookPageQueriesRatingListRequestType
) => {
  const { data } = await axios.get<MyBookPageQueriesRatingListResponseType>(
    `/api/my_book/rating/list/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책의 한줄평을 불러오는 API
 */
export const myBookCommentsAPI = async (
  users_books_id: MyBookPageQueriesCommentRequestType
) => {
  const { data } = await axios.get<MyBookPageQueriesCommentResponseType>(
    `/api/my_book/comments/list/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책의 정보를 불러오는 API
 */
export const myBookInfoAPI = async (
  users_books_id: MyBookPageQueriesInfoRequestType
) => {
  const { data } = await axios.get<MyBookPageQueriesInfoResponseType>(
    `/api/my_book/info/${users_books_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책인지 확인하는 API
 */
export const myBookExistAPI = async (isbn: MyBookExistQueryRequestType) => {
  const { data } = await axios.get<MyBookExistQueryResponseType>(
    `/api/my_book/exist/${isbn}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책의 시간 범위를 확인하는 API
 */
export const myBookTimeRangeAPI = async (
  users_books_id: MyBookPageQueriesTimeRangeRequestType
) => {
  const { data } = await axios.get<MyBookPageQueriesTimeRangeResponseType>(
    `/api/my_book/time_range/${users_books_id}`
  );
  return data;
};

// CREATE

/**
 * * 내 서재에 등록된 책에 독서기록을 등록하는 API
 */
export const myBookHistoryRegisterAPI = async (
  body: MyBookHistoryMutationRequestType
) => {
  const { data } = await axios.post<MyBookHistoryMutationResponseType>(
    `/api/my_book/history/register`,
    body
  );
  return data;
};

/**
 * * 내 서재에 등록된 책에 평점을 등록하는 API
 */
export const myBookRatingRegisterAPI = async (
  body: MyBookRatingMutationRequestType
) => {
  const { data } = await axios.post<MyBookRatingMutationResponseType>(
    `/api/my_book/rating/register`,
    body
  );
  return data;
};

/**
 * * 내 서제에 등록된 책에 한줄평을 등록하는 API
 */
export const myBookCommentsRegisterAPI = async (
  body: MyBookCommentMutationRequestType
) => {
  const { data } = await axios.post<MyBookCommentMutationResponseType>(
    `/api/my_book/comments/register`,
    body
  );
  return data;
};

// DELETE

/**
 * * 내 서재에 등록된 책의 평점을 삭제하는 API
 */
export const myBookRatingDeleteAPI = async (
  users_books_rating_id: MyBookRatingDeleteMutationRequestType
) => {
  const { data } = await axios.delete<MyBookRatingDeleteMutationResponseType>(
    `/api/my_book/delete/rating/${users_books_rating_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책의 독서기록을 삭제하는 API
 */
export const myBookHistoryDeleteAPI = async (
  users_books_history_id: number
) => {
  const { data } = await axios.delete(
    `/api/my_book/delete/history/${users_books_history_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책의 한줄평을 삭제하는 API
 */
export const myBookCommentDeleteAPI = async (comment_id: number) => {
  const { data } = await axios.delete(
    `/api/my_book/comment/delete/${comment_id}`
  );
  return data;
};

/**
 * * 내 서재에 등록된 책을 삭제하는 API
 */
export const myBookListDeleteAPI = async (
  users_books_id: MyBookListDeleteMutationRequestType
) => {
  const { data } = await axios.delete<MyBookListDeleteMutationResponseType>(
    `/api/my_book/list/delete/${users_books_id}`
  );
  return data;
};
