// useProfileEditMutation의 타입들

type ProfileEditMutationResponseType = MutationResponse & {
  profile: string;
};
type ProfileEditMutationRequestType = FormData;

// useProfileInfoQuery의 타입들

type ProfileInfoQueryResponseType = {
  comments_count: number;
  books_count: number;
  likes_count: number;
};

// useProfileLikeQuery의 타입들
type ProfileLikeQueryRequestType = number;
type ProfileLikeQueryResponseType = {
  page: number;
  totalPage: number;
  totalItem: number;
  nextPage?: number;
  prevPage?: number;
  items: ProfileLikeQueryListType;
};
type ProfileLikeQueryListType = ProfileLikeQueryItemType[];
type ProfileLikeQueryItemType = {
  like_id: number;
  status: '다읽음' | '읽는중' | '읽기전';
  comment_id: number;
  title: string;
  profile: string;
  name: string;
};

// useProfileReplyQuery의 타입들
type ProfileReplyQueryRequestType = number;
type ProfileReplyQueryResponseType = {
  page: number;
  totalPage: number;
  totalItem: number;
  nextPage?: number;
  prevPage?: number;
  items: ProfileReplyQueryListType;
};
type ProfileReplyQueryListType = ProfileReplyQueryItemType[];
type ProfileReplyQueryItemType = {
  reply_id: number;
  status: '다읽음' | '읽는중' | '읽기전';
  comment_id: number;
  title: string;
  profile: string;
  name: string;
};
