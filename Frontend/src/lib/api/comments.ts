import { axios } from './';

// READ

/**
 * * 한줄평을 공개로 등록한 목록을 불러오는 API
 */
export const commentsListAPI = async () => {
  const { data } = await axios.get<CommentsListQueryResponseType>(
    `/api/comments/list`
  );
  return data;
};

/**
 * * 한줄평 좋아요 누른 유저 아이디 불러오는 API
 */
export const commentsLikeListAPI = async (
  comment_id: CommentsLikeListRequestType
) => {
  const { data } = await axios.get<CommentsLikeListQueryResponseType>(
    `/api/comments/like/list/${comment_id}`
  );
  return data;
};

/**
 * * 한줄평에 좋아요를 등록하는 API
 */
export const commentsLikeRegisterAPI = async (comment_id: number) => {
  const { data } = await axios.post<CommentsLikeMutationResponseType>(
    `/api/comments/like/register/${comment_id}`
  );
  return data;
};
