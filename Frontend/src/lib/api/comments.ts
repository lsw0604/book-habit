import { axios } from './';

export const commentsListAPI = async () => {
  const { data } = await axios.get<CommentsListResponseType>(
    `/api/comments/list`
  );
  return data;
};
