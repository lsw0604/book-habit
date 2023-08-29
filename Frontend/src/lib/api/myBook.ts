import { axios } from './';

export const myBookListAPI = async (page: number, status: SelectorBookType) => {
  const { data } = await axios.get(
    `/api/my_book/list?page=${page}&status=${status}`
  );
  return data;
};

export const myBookInfoAPI = async (users_books_id: number) => {
  const { data } = await axios.get(`/api/my_book/info/${users_books_id}`);
  return data;
};

export const myBookExistAPI = async (isbn: string) => {
  const { data } = await axios.get(`/api/my_book/exist/${isbn}`);
  return data;
};

export const readMyBookRegisterAPI = async (body: MyBookInfoAddReadType) => {
  const { data } = await axios.post(`/api/my_book/read`, body);
  return data;
};

export const readingMyBookRegisterAPI = async (
  body: MyBookInfoAddReadingType
) => {
  const { data } = await axios.post(`/api/my_book/reading`, body);
  return data;
};
